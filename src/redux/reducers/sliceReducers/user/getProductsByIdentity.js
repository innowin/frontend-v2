const base = (state, action) => {
  const {productOwnerId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [productOwnerId]: {
        ...state.list[productOwnerId],
        products: {
          ...previousProduct,
          isLoading: true,
          error: null,
        },
      },
    },
  }
}

const success = (state, action) => {
  const {productOwnerId, data} = action.payload || {}
  if (productOwnerId) {
    const defaultObject2 = {content: [], isLoading: false, error: null}
    const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject2

    const arrayOfProductId = data.map(product => product.id)
    return {
      ...state,
      list: {
        ...state.list,
        [productOwnerId]: {
          ...state.list[productOwnerId],
          products: {
            ...previousProduct,
            // content: [...new Set([...previousProduct.content, ...arrayOfProductId])],
            content: arrayOfProductId,
            isLoading: false,
            error: null,
          },
        },
      },
    }
  } else return {state}
}

const error = (state, action) => {
  const {productOwnerId, message} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [productOwnerId]: {
        ...state.list[productOwnerId],
        products: {
          ...previousProduct,
          isLoading: false,
          error: message,
        },
      },
    },
  }
}

export default {
  base,
  success,
  error,
}