// @flow
import types from './types'

const getExchangeIdentitiesByMemberIdentity = (identityId: number) => ({
  type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
  payload: {
    identityId
  }
})

const getExchangeIdentitiesByMemberIdentityIsLoading = () => ({
  type: types.IS_LOADING.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
  payload: {}
})

const ExchangeActions = {
  getExchangeIdentitiesByMemberIdentity,
  getExchangeIdentitiesByMemberIdentityIsLoading
}

export default ExchangeActions