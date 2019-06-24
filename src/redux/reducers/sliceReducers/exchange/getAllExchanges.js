const success = (state, action) => {
  const {data, search, hashtags, isLoading} = action.payload
  let allExchanges = {}
  data.forEach(exchange => {
    state.list[exchange.id] ?
        allExchanges[exchange.id] = {
          ...state.list[exchange.id],
          ...exchange,
        }
        :
        allExchanges[exchange.id] = {
          ...exchange,
        }
  })

  return {
    ...state,
    list: {
      ...state.list,
      ...allExchanges,
    },
    searchByWord: search,
    searchByHashtags: hashtags,
    isLoading: isLoading,
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success,
}