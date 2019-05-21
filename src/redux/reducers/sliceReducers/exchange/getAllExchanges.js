const success = (state, action) => {
  const {data, search, hashtags, isLoading} = action.payload
  let allExchanges = {}
  data.forEach(exchange => {
    let exchange_data = exchange.exchange
    state.list[exchange_data.id] ?
        allExchanges[exchange_data.id] = {
          ...state.list[exchange_data.id],
          ...exchange_data,
        }
        :
        allExchanges[exchange_data.id] = {
          ...exchange_data,
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