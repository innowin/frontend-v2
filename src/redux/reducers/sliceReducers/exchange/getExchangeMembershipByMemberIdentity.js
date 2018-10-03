const success = (state, action) => {
  const {exchangeData} = action.payload
  const nextExchange = {}
  
  for (let id in exchangeData) {
    nextExchange[id] = {
      ...state.list[id],
      exchange: exchangeData[id].exchange
    }
  }
  return {
    ...state,
    list: {
      ...state.list,
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