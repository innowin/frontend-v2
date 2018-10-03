import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'
import constants from "../../../../consts/constants";

const getFollows = state => state.common.social.follows.list
const getUserFollows = (state, props) => {
  const {ownerId, identityType} = props
  if (identityType === constants.USER_TYPES.PERSON) {
    const usersList = state.users.list
    if (usersList[ownerId] && usersList[ownerId].social && usersList[ownerId].social.follows)
      return usersList[ownerId].social.follows.content
  } else if (identityType === constants.USER_TYPES.ORG) {
    const organsList = state.organs.list
    if (organsList[ownerId] && organsList[ownerId].social && organsList[ownerId].social.follows)
      return organsList[ownerId].social.follows.content
  }
  return undefined
}
const getUsers = state => state.users.list
const getOrgans = state => state.organs.list
const getIdentityId = (state, props) => props.identityId

/** this selector selects followers by identity **/
export const getFollowersSelector = createSelector(
  [getFollows, getUserFollows, getUsers, getOrgans, getIdentityId],
  (follows, userFollows, users, organsList, identityId) => {
    if (follows && Object.keys(follows).length !== 0 && follows.constructor === Object && userFollows && identityId) {
      const arrayFollows = helpers.getObjectOfArrayKeys(userFollows, follows)
      return arrayFollows.filter(follow => follow.follow_followed.id === identityId).map(follow => {
        let id = 0, img = ''
        if (follow.follow_follower.identity_user) {
          id = follow.follow_follower.identity_user
          if (users[id] && users[id].profile && users[id].profile.content.profile_media) {
            img = users[id].profile.content.profile_media.file
          }
          else {
            img = ''
          }
        }
        else {
          id = follow.follow_follower.identity_organization
          if (organsList[id] && organsList[id].organization && organsList[id].organization.content.organization_logo) {
            img = organsList[id].organization.content.organization_logo.file
          }
          else {
            img = ''
          }
        }
        return {
          ...follow.follow_follower,
          img: img,
          follow_id: follow.id,
          follow_accepted: follow.follow_accepted,
        }
      })
    }
    return []
  }
)