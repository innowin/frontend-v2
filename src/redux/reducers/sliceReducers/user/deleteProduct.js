const base = (state, action) => {
}

const success = (state, action) => {
  const {productOwnerId, productId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject2

  const newDeletedProducts = previousProduct.content.filter(id => id !== productId);
  return {
    ...state,
    list: {
      ...state.list,
      [productOwnerId]: {
        ...state.list[productOwnerId],
        products: {
          ...previousProduct,
          content: [...newDeletedProducts],
          isLoading: false,
          error: null
        }
      }
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