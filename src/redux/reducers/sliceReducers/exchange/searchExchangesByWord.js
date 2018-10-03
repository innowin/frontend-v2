const success = (state, action) => {
  const {data} = action.payload
  let searchedByWordExchanges = []
  if (data.length > 0) {
    data.forEach(exchange => {
      searchedByWordExchanges.push(exchange.id)
    })
  }
  else {
    searchedByWordExchanges.push(-1)
    // -1 means that no exchange found!
  }
  return {
    ...state,
    list: {...state.list, searchByWord: searchedByWordExchanges.slice()}
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