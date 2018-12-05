const success = (state, action) => {
  const {exchangeData} = action.payload
  const nextExchange = {}
  const allExchanges = {...state.list}

  for (let id in allExchanges) {
    delete allExchanges[id].exchange.content.exchange
  }

  for (let id in exchangeData) {
    state.list[id] && state.list[id].exchange ?
        nextExchange[id] = {
          ...state.list[id],
          exchange: {...state.list[id].exchange, content: {...state.list[id].exchange.content, exchange: exchangeData[id].exchange}}
        }
        :
        nextExchange[id] = {
          ...state.list[id],
          exchange: {content: {exchange: exchangeData[id].exchange}}
        }
  }


  return {
    ...state,
    list: {
      ...allExchanges,
      ...nextExchange
    }
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success
}