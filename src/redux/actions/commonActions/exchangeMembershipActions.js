import types from '../types'

const deleteExchangeMembership = ({exchangeMembershipId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}) => ({
  type: types.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP,
  payload: {exchangeMembershipId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}
})

const ExchangeMembershipActions = {
  deleteExchangeMembership,
}

export default ExchangeMembershipActions
