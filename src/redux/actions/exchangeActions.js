import types from './types'

const getExchangeIdentitiesByMemberIdentity = ({identityId, membershipOwnerType, membershipOwnerId}) => ({
  type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
  payload: {identityId, membershipOwnerType, membershipOwnerId}
})

const getExchangeByExId = (id) => ({
  type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
  payload: {id}
})

const getExchangeMembersByExId = (id) => ({
  type: types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
  payload: {id}
})

const createExchange = (formValues, finished) => ({
  type: types.EXCHANGE.CREATE_EXCHANGE,
  payload: {formValues, finished}
})


const addToExchange = (identityId, exchangeIdentity) => ({
  type: types.EXCHANGE.ADD_TO_EXCHANGE,
  payload: {
    identityId,
    exchangeIdentity
  }
})

const ExchangeActions = {
  getExchangeIdentitiesByMemberIdentity,
  getExchangeByExId,
  getExchangeMembersByExId,
  addToExchange,
  createExchange
}

export default ExchangeActions;
