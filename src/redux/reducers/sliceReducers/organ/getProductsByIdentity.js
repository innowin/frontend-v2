import constants from "src/consts/constants";

const base = (state, action) => {
  const {productOwnerId, productOwnerType} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject

  if (productOwnerType === constants.USER_TYPES.ORG) {
    return {
      ...state,
      list: {
        ...state.list,
        [productOwnerId]: {
          ...state.list[productOwnerId],
          products: {
            ...previousProduct,
            isLoading: true,
            error: null
          }
        }
      }
    }
  }
  else {
    return state
  }
}

const success = (state, action) => {
  const {productOwnerId, productOwnerType, data} = action.payload || {}
  // const defaultObject = {content: [], isLoading: false, error: null}
  // const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject

  if (productOwnerType === constants.USER_TYPES.ORG) {
    const arrayOfProductId = data.map(product => product.id)
    return {
      ...state,
      list: {
        ...state.list,
        [productOwnerId]: {
          ...state.list[productOwnerId],
          products: {
            // content: [...new Set([...previousProduct.content, ...arrayOfProductId])],
            content: arrayOfProductId,
            isLoading: false,
            error: null
          }
        }
      }
    }
  }
  else {
    return state
  }
}

const error = (state, action) => {
  const {productOwnerId, productOwnerType, message} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject

  if (productOwnerType === constants.USER_TYPES.ORG) {
    return {
      ...state,
      list: {
        ...state.list,
        [productOwnerId]: {
          ...state.list[productOwnerId],
          products: {
            ...previousProduct,
            isLoading: false,
            error: message
          }
        }
      }
    }
  }
  else {
    return state
  }
}

export default {
  base,
  success,
  error,
}