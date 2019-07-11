import {createSelector} from 'reselect'

const getAllExchanges = (state) => {
  const allExchanges = state.exchanges.list
  let exchanges = {...allExchanges}
  if (state.exchanges.searchByWord)
    exchanges = Object.values(exchanges).filter(exchange =>
        (exchange.name && exchange.name.includes(state.exchanges.searchByWord)) ||
        (exchange.description && exchange.description.includes(state.exchanges.searchByWord)),
    )
  if (state.exchanges.searchByHashtags && state.exchanges.searchByHashtags.length > 0) {
    exchanges = Object.values(exchanges).filter(exchange => {
          let ok = false
          state.exchanges.searchByHashtags.forEach(hashtag => {
            exchange.exchange_hashtag.forEach(tag => {
              if (!ok) ok = hashtag === tag
            })
          })
          return ok
        },
    )
  }
  return exchanges
}

export const getExchanges = createSelector(
    getAllExchanges,
    exchange => exchange,
)

const getAllTheExchanges = (state) => {
  return state.exchanges.list
}

export const getAllOfExchanges = createSelector(
    getAllTheExchanges,
    exchange => exchange,
)