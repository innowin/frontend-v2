const base = (state, action) => {
  const {productId} = action.payload
  const prevProduct = state.list[productId]
  return {
    ...state,
    list:{
      ...state.list,
      [productId]: {...prevProduct, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {productId} = action.payload
  const {[`${productId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
  }
}

const error = (state, action) => {
  const {message, productId} = action.payload
  const prevProduct = state.list[productId]
  return {
    ...state,
    list:{
      ...state.list,
      [productId]: {...prevProduct, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}