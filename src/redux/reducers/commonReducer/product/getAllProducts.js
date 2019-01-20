const success = (state, action) => {
  const {data, isLoading, search} = action.payload

  let allProducts = {}
  data.forEach(product => {
    allProducts[product.id] = {...state.list[product.id], ...product}
  })

  return {
    ...state,
    list: {
      ...state.list,
      ...allProducts
    },
    isLoading,
    search
  }
}

export default {
  success
}
