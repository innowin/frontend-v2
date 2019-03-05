const success = (state, action) => {
  const {data, search, isLoading} = action.payload
  let allExchanges = {}
  data.forEach(exchange => {
    // commented for unFollow exchange bug ; better to change in future
    // allExchanges[exchange.id] = {...state.list[exchange.id], ...exchange}

    let exchange_data = exchange.exchange


    // let data = {...exchange.exchange}
    // data.joint_follows = exchange.joint_follows
    // data.is_joined = exchange.is_joined
    // data.supply = exchange.supply
    // data.demand = exchange.demand
    state.list[exchange_data.id] ?
        allExchanges[exchange_data.id] = {
          ...state.list[exchange_data.id],
          ...exchange_data
        }
        :
        allExchanges[exchange_data.id] = {
          ...exchange_data
        }
  })

  return {
    ...state,
    list: {
      ...state.list,
      ...allExchanges
    },
    searchByWord: search,
    isLoading: isLoading
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