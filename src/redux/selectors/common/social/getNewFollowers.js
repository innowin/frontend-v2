import {createSelector} from 'reselect'

const getUsers = state => state.identities.list
const getFollows = state => state.common.social.follows.list
const userId = (state, props) => props.userId

export const getFollowersSelector = createSelector(
    [getUsers, getFollows, userId],
    (identities, follows, userId) => {
      if (userId) {
        const user = identities[userId]
        const user_follows_arr = user.social && user.social.follows && user.social.follows.content
        const user_follows_obj = {}
        user_follows_arr && user_follows_arr.forEach(id => follows[id] ? user_follows_obj[id] = {...follows[id], followId: id} : null)
        let user_follows = Object.values(user_follows_obj).filter(p => p.follow_followed.id ? p.follow_followed.id === userId : p.follow_followed === userId)
        return user_follows.reduce((sum, p) => {
          return [...sum, {...p.follow_follower, followId: p.followId}]
        }, [])
      }
      else return []
    },
)