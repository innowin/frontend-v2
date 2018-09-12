import types from './types'

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
  getExchangeByExId,
  getExchangeMembersByExId,
  addToExchange,
  createExchange
}

export default ExchangeActions;
