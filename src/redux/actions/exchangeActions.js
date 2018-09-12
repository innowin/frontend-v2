import types from './types'

const getExchangeByExId = (id) => ({
  type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
  payload: {id}
})

const createExchange = (formValues, finished) => ({
  type: types.EXCHANGE.CREATE_EXCHANGE,
  payload: {formValues, finished}
})

const ExchangeActions = {
  getExchangeByExId,
  createExchange
}

export default ExchangeActions;
