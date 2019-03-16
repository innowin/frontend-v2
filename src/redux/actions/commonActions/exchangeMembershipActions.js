import types from '../types'

const deleteExchangeMembership = ({exchangeMembershipId, exchangeMembershipOwnerId}) => ({
  type: types.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP,
  payload: {exchangeMembershipId, exchangeMembershipOwnerId}
})

const getExchangeMembershipByMemberIdentity = ({identityId, exchangeMembershipOwnerId}) => ({
  type: types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
  payload: {identityId, exchangeMembershipOwnerId}
})

const getExchangeMembershipByExchangeId = ({exchangeId}) => ({
  type: types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID,
  payload: {exchangeId}
})

const createExchangeMembership = ({identityId, exchangeIdentity}) => ({
  type: types.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP,
  payload: {
    identityId,
    exchangeIdentity
  }
})

const ExchangeMembershipActions = {
  deleteExchangeMembership,
  getExchangeMembershipByMemberIdentity,
  getExchangeMembershipByExchangeId,
  createExchangeMembership,
}

export default ExchangeMembershipActions
