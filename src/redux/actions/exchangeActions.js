// @flow
import types from './types'

const getExchangeIdentitiesByMemberIdentity = (identityId: number) => ({
  type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
  payload: {
    identityId
  }
})

const ExchangeActions = {
  getExchangeIdentitiesByMemberIdentity
}

export default ExchangeActions