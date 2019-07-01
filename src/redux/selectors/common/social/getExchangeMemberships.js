import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getExchangeMemberships = state => state.common.exchangeMembership.list

const getUserMemberships = (state, props) => {
  const usersList = state.identities.list
  const id = props.identityId || props.ownerId
  if (usersList[id] && usersList[id].exchangeMemberships)
    return usersList[id].exchangeMemberships.content
  else return undefined
}

const getOwnerId = (state, props) => (props.identityId || props.ownerId)

/** this selector selects exchanges by identity **/
export const getExchangeMembershipsSelector = createSelector(
    [getExchangeMemberships, getUserMemberships, getOwnerId],
    (memberships, userMemberships, ownerId) => {
      if (memberships && Object.keys(memberships).length !== 0 && memberships.constructor === Object && userMemberships && ownerId) {
        const arrayMemberships = helpers.getObjectOfArrayKeys(userMemberships, memberships)
        return arrayMemberships
            .filter(p => p)
            .map(membership => {
              const membershipOwnerIdentity = membership.exchange_identity_related_identity
              const membershipOwnerId = membershipOwnerIdentity.id
              const membershipOwnerType = membershipOwnerIdentity.identity_type
              return {
                membership_id: membership.id,
                membership_owner_type: membershipOwnerType,
                membership_owner_id: membershipOwnerId, ...membership.exchange_identity_related_exchange,
              }
            })
            .sort((a, b) => new Date(b.updated_time) - new Date(a.updated_time))
      }
      return []
    },
)