import {createSelector} from "reselect"

const getUsers = state => state.identities.list
const getFollows = state => state.common.social.follows.list
const clientId = state => state.auth.client.identity.content

const userId = (state, props) => props.userId

export const getFollowersSelector = createSelector(
    [getUsers, getFollows, userId, clientId],
    (identities, follows, userId, clientId) => {
      if (userId) {
        let user = identities[userId]
        let user_follows_arr = user.social && user.social.follows.content
        let user_follows_obj = {}
        user_follows_arr && user_follows_arr.forEach(id => follows[id] ? user_follows_obj[id] = follows[id] : null)
        let user_follows = Object.values(user_follows_obj).filter(p => p.follow_followed.id === userId)
        let followers = []
        user_follows.forEach(p => followers.push(p.follow_follower))
        return followers
      }
    }
)