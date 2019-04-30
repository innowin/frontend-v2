import {createSelector} from 'reselect'

const getUsers = state => state.identities.list
const getFollows = state => state.common.social.follows.list
const userId = (state, props) => props.userId

export const getFollowingsSelector = createSelector(
    [getUsers, getFollows, userId],
    (identities, follows, userId) => {
      if (userId) {
        let user = identities[userId]
        let user_follows_arr = user.social && user.social.follows.content
        let user_follows_obj = {}
        user_follows_arr && user_follows_arr.forEach(id => follows[id] ? user_follows_obj[id] = follows[id] : null)
        let user_follows = Object.values(user_follows_obj).filter(p => p.follow_follower.id ? p.follow_follower.id === userId : p.follow_follower === userId)
        let followings = []
        user_follows.forEach(p => followings.push(p.follow_followed))
        return followings
      }
    },
)