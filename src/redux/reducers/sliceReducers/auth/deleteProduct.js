const base = (state, action) => {
}

const success = (state, action) => {
  const {productId} = action.payload || {}
  const {client} = state
  const previousProduct = (client && client.products) || []

  const newDeletedProducts = previousProduct.filter(id => id !== productId);
  return {
    ...state,
    client: {
      ...client,
      products: [...newDeletedProducts]
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