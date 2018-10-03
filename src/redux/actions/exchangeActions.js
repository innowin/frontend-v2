import types from './types'

const getExchangeByExId = (id) => ({
  type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
  payload: {id}
})

const createExchange = (formValues, finished) => ({
  type: types.EXCHANGE.CREATE_EXCHANGE,
  payload: {formValues, finished}
})

const getAllExchanges = (limit, offset) => ({
  type: types.EXCHANGE.GET_EXCHANGES,
  payload: {limit, offset}
})

const searchExchangesByWord = (searchWord) => ({
  type: types.EXCHANGE.SEARCH_EXCHANGES_BY_WORD,
  payload: {searchWord}
})

const ExchangeActions = {
  getExchangeByExId,
  createExchange,
  getAllExchanges,
  searchExchangesByWord,
}

export default ExchangeActions;
