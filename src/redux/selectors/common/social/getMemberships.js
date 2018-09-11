import {createSelector} from 'reselect'
import helpers from "../../../../consts/helperFunctions";
const getMemberships = state => state.common.membership.list

const getUserMemberships = (state, props) => {
  if (state && state.users && state.users[props.userId] && state.users[props.userId].memberships)
    return state.users[props.userId].memberships.content
  else return undefined
}

/** this selector selects exchanges by identity **/
export const makeGetMembershipsSelector = (state, props) => {
  return createSelector(
      [getMemberships, getUserMemberships],
      (memberships, userMemberships) => {
        const {userId} = props
        if (memberships && Object.keys(memberships).length !== 0 && memberships.constructor === Object && userMemberships && userId) {
          const arrayMemberships = helpers.getObjectOfArrayKeys(userMemberships, memberships)
          return arrayMemberships.map(membership => membership.exchange_identity_related_exchange)
        }
        return []
      }
  )
}