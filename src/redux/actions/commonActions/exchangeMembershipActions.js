import types from '../types'

const deleteExchangeMembership = ({exchangeMembershipId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}) => ({
  type: types.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP,
  payload: {exchangeMembershipId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}
})

const getExchangeMembershipByMemberIdentity = ({identityId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}) => ({
  type: types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
  payload: {identityId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}
})

const ExchangeMembershipActions = {
  deleteExchangeMembership,
  getExchangeMembershipByMemberIdentity,
}

export default ExchangeMembershipActions
