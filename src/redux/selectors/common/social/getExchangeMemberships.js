import {createSelector} from 'reselect'
import helpers from "src/consts/helperFunctions/helperFunctions"
import constants from "src/consts/constants"

const getExchangeMemberships = state => state.common.exchangeMembership.list

const getUserMemberships = (state, props) => {
  const id = props.id || props.ownerId
  const identityType = props.identityType
  if (identityType === constants.USER_TYPES.USER) {
    const usersList = state.identities.list
    if (usersList[id] && usersList[id].exchangeMemberships)
      return usersList[id].exchangeMemberships.content
  } else if (identityType === constants.USER_TYPES.ORG) {
    const organsList = state.identities.list
    if (organsList[id] && organsList[id].exchangeMemberships)
      return organsList[id].exchangeMemberships.content
  }
  return undefined
}

const getOwnerId = (state, props) => (props.id || props.ownerId)

/** this selector selects exchanges by identity **/
export const getExchangeMembershipsSelector = createSelector(
    [getExchangeMemberships, getUserMemberships, getOwnerId],
    (memberships, userMemberships, ownerId) => {
      if (memberships && Object.keys(memberships).length !== 0 && memberships.constructor === Object && userMemberships && ownerId) {
        const arrayMemberships = helpers.getObjectOfArrayKeys(userMemberships, memberships)
        return arrayMemberships.map(membership => {
          const membershipOwnerIdentity = membership.exchange_identity_related_identity
          const membershipOwnerId = membershipOwnerIdentity.id
          const membershipOwnerType = membershipOwnerIdentity.identity_type
          return {
            membership_id: membership.id,
            membership_owner_type: membershipOwnerType,
            membership_owner_id: membershipOwnerId, ...membership.exchange_identity_related_exchange
          }
        })
      }
      return []
    }
  )