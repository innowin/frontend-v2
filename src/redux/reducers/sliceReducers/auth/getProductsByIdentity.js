const base = (state, action) => {
}

const success = (state, action) => {
  const {data, identityId} = action.payload || {}

  const {client} = state
  const previousProduct = (client && client.products) || []

  data.map(product => {
    if (identityId === state.client.identity.content && (!previousProduct.includes(product.id))) {
      return previousProduct.push(product.id)
    }
    return previousProduct
  })
  return {
    ...state,
    client: {
      ...client,
      // products: [...previousProduct, ...arrayOfProductId],
      products: previousProduct,
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