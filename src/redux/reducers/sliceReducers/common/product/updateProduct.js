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
  const {data, productId} = action.payload
  const prevProduct = state.list[productId]
  return {
    ...state,
    list:{
      ...state.list,
      [productId]: {
        ...prevProduct,
        ...data,
        isLoading: false,
        error: null
      }
    }
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