import types from './types'

const getExchangeByExId = (id) => ({
  type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
  payload: {id},
})

const createExchange = (formValues, finished) => ({
  type: types.EXCHANGE.CREATE_EXCHANGE,
  payload: {formValues, finished},
})

const editExchange = (formValues) => ({
  type: types.EXCHANGE.EDIT_EXCHANGE,
  payload: {formValues},
})

const deleteExchange = (id) => ({
  type: types.EXCHANGE.DELETE_EXCHANGE,
  payload: {id},
})

const getAllExchanges = (limit, offset, search, hashtags) => ({
  type: types.EXCHANGE.GET_EXCHANGES,
  payload: {limit, offset, search, hashtags},
})

const ExchangeActions = {
  getExchangeByExId,
  createExchange,
  editExchange,
  deleteExchange,
  getAllExchanges,
}

export default ExchangeActions
