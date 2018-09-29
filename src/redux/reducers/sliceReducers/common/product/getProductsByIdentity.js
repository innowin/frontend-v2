const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedProduct = {}
  data.forEach(product => {
    const prevProduct = state.list[product.id]
    indexedProduct[product.id] = {...prevProduct, ...product, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedProduct,
    }
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}