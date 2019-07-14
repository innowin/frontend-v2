import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const exchanges = state => state.exchanges.list

const getExchangeMemberships = state => state.common.exchangeMembership.list

const getUserMemberships = (state, props) => {
  const usersList = state.identities.list
  const id = props.identityId || props.ownerId
  if (usersList[id] && usersList[id].exchangeMemberships)
    return usersList[id].exchangeMemberships.content
  else return []
}

/** this selector selects exchanges by identity **/
export const getExchangeMembershipsSelector = createSelector(
    [exchanges, getExchangeMemberships, getUserMemberships],
    (exchanges, memberships, userMemberships) => {
      if (memberships && Object.keys(memberships).length !== 0 && userMemberships) {
        return helpers.getObjectOfArrayKeys(userMemberships, memberships)
            .map(membership => exchanges[membership.exchange_identity_related_exchange])
            .sort((a, b) => new Date(b.updated_time) - new Date(a.updated_time))
      }
      return []
    },
)