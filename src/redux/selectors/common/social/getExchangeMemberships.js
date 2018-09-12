import {createSelector} from 'reselect'
import helpers from "../../../../consts/helperFunctions";
import constants from "../../../../consts/constants";

const getExchangeMemberships = state => state.common.exchangeMembership.list

const getUserMemberships = (state, props) => {
  const id = props.id || props.userId
  if (state && state.users && state.users[id] && state.users[id].exchangeMemberships)
    return state.users[id].exchangeMemberships.content
  else return undefined
}

/** this selector selects exchanges by identity **/
export const makeGetExchangeMembershipsSelector = (state, props) => {
  return createSelector(
      [getExchangeMemberships, getUserMemberships],
      (memberships, userMemberships) => {
        const id = props.id || props.userId
        if (memberships && Object.keys(memberships).length !== 0 && memberships.constructor === Object && userMemberships && id) {
          const arrayMemberships = helpers.getObjectOfArrayKeys(userMemberships, memberships)
          return arrayMemberships.map(membership => {
            const membershipOwnerIdentity = membership.exchange_identity_related_identity
            const membershipOwnerId = membershipOwnerIdentity.identity_user ? membershipOwnerIdentity.identity_user.id : membershipOwnerIdentity.identity_organization.id
            const membershipOwnerType = membershipOwnerIdentity.identity_user ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
            return {membership_id: membership.id, membership_owner_type: membershipOwnerType, membership_owner_id: membershipOwnerId, ...membership.exchange_identity_related_exchange}
          })
        }
        return []
      }
  )
}