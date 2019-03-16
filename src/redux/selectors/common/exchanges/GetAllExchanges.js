import {createSelector} from 'reselect'

const getAllExchanges = (state) => {
  let allExchanges = state.exchanges.list
  if (state.exchanges.searchByWord)
    return Object.values(allExchanges).filter(exchange =>
        (exchange.name && exchange.name.includes(state.exchanges.searchByWord)) ||
        (exchange.description && exchange.description.includes(state.exchanges.searchByWord)),
    )
  else return allExchanges
}

export const getExchanges = createSelector(
    getAllExchanges,
    exchange => exchange,
)