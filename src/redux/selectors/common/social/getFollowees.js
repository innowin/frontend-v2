import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'


const getFollows = state => state.common.social.follows.list
const getUserFollows = (state, props) => {
  const ownerId = props.ownerId || (props.owner && props.owner.id)
  const usersList = state.identities.list
  if (usersList[ownerId] && usersList[ownerId].social && usersList[ownerId].social.follows)
    return usersList[ownerId].social.follows.content
  return undefined
}
const getUser = (state, props) => props.ownerId || (props.owner && props.owner.id)

export const getFolloweesSelector = createSelector(
    [getFollows, getUserFollows, getUser],
    (follows, userFollows, identity) => {
      if (follows && userFollows) {
        const arrayFollows = helpers.getObjectOfArrayKeys(userFollows, follows)
        return arrayFollows.filter(follow => follow && (follow.follow_follower.id ? follow.follow_follower.id === identity : follow.follow_follower === identity))
      }
      else return []
    },
)