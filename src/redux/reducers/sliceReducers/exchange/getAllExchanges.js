const success = (state, action) => {
  const {data} = action.payload
  let allExchanges = {}
  data.results.forEach(exchange => {
    allExchanges[exchange.id] = {...exchange}
  })

  return {
    ...state,
    list: {
      ...state.list,
      ...allExchanges,
    },
    searchByWord: [],
    searchByHashTag: []
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