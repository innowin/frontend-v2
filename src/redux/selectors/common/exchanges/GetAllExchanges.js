import {createSelector} from 'reselect'

const getAllExchanges = (state) => {
  let allExchanges = {...state.exchanges.list}
  let searched = state.exchanges.list.searchByWord ? state.exchanges.list.searchByWord : []
  if (searched.length > 0) {
    if ((searched[0] !== -1)) {
      let exchanges = {}
      Object.values(searched).forEach(p => {
        exchanges[p] = allExchanges[p]
      })
      return exchanges
    }
    else
    {
      return []
    }
  }
  else {
    return allExchanges
  }
}

export const getExchanges = createSelector(
    getAllExchanges,
    exchagne => exchagne
)