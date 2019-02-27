import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {productOwnerId, productOwnerType, productId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousProduct = (state.list[productOwnerId] && state.list[productOwnerId].products) || defaultObject2

  if (productOwnerType === constants.USER_TYPES.USER) {
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
  else {
    return state
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}