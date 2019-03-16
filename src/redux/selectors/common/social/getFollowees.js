import {createSelector} from 'reselect'
import constants from "../../../../consts/constants";
import helpers from 'src/consts/helperFunctions/helperFunctions'

/*
tip:
 ownerId, identityType, identityId should be in props.

 ownerId is the id of user or the id of organization.
 identityType is type of user(ORG or PERSON).
 identityId is the id of identity of follower.
*/

const getFollows = state => state.common.social.follows.list
const getUserFollows = (state, props) => {
  const ownerId = props.ownerId || (props.owner && props.owner.id)
  const identityType = props.identityType || props.sideBarType
  if (identityType === constants.USER_TYPES.USER) {
    const usersList = state.identities.list
    if (usersList[ownerId] && usersList[ownerId].social && usersList[ownerId].social.follows)
      return usersList[ownerId].social.follows.content
  } else if (identityType === constants.USER_TYPES.ORG) {
    const organsList = state.organs.list
    if (organsList[ownerId] && organsList[ownerId].social && organsList[ownerId].social.follows)
      return organsList[ownerId].social.follows.content
  }
  return undefined
}
const getUsers = state => state.identities.list
const getOrgans = state => state.identities.list
const getIdentityId = (state, props) => props.identityId

const getFiles = state => state.common.file.list

/** this selector selects followees by identity **/
export const getFolloweesSelector = createSelector(
  [getFollows, getUserFollows, getUsers, getOrgans, getIdentityId, getFiles],
  (follows, userFollows, users, organsList, identityId, files) => {
    if (follows && Object.keys(follows).length !== 0 && follows.constructor === Object && userFollows && identityId) {
      const arrayFollows = helpers.getObjectOfArrayKeys(userFollows, follows)
      const followeeList = arrayFollows.filter(follow => follow && follow.follow_follower.id === identityId).map(follow => {
        let id, img
        if (follow.follow_followed.identity_user) {
          id = follow.follow_followed.identity_user
          if (users[id] && users[id].profile && users[id].profile.content.profile_media) {
            img = users[id].profile.content.profile_media.file
          }
          else {
            img = ''
          }
        }
        else {
          id = follow.follow_followed.identity_organization
          const logoId = organsList[id] && organsList[id].organization && organsList[id].organization.content.organization_logo
          if (logoId && files[logoId]) {
            img = files[logoId].file
          }
          else {
            img = ''
          }
        }
        return {
          ...follow.follow_followed,
          img: img,
          follow_id: follow.id,
          follow_accepted: follow.follow_accepted,
        }
      })
      return [...followeeList]
    }
    return []
  }
)