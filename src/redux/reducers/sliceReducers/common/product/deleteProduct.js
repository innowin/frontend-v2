const base = (state, action) => {
  const {productId} = action.payload
  const prevProduct = state.list[productId]
  return {
    ...state,
    list: {
      ...state.list,
      [productId]: {...prevProduct, error: null, isLoading: true},
    },
  }
}

const success = (state, action) => {
  const {productId} = action.payload
  const prevProduct = state.list[productId]
  return {
    ...state,
    list: {
      ...state.list,
      [productId]: {...prevProduct, error: true, isLoading: false},
    },
  }
}

const error = (state, action) => {
  const {productId} = action.payload
  const prevProduct = state.list[productId]
  return {
    ...state,
    list: {
      ...state.list,
      [productId]: {...prevProduct, error: null, isLoading: false},
    },
  }
}

export default {
  base,
  success,
  error,
}
