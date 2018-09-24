const base = (state, action) => {
}

const success = (state, action) => {
  const {data, identityId} = action.payload || {}

  const {client} = state
  const previousProduct = (client && client.products) || []

  const arrayOfProductId = []
  data.map(product => {
    if (identityId === state.client.identity.id && (!previousProduct.includes(product.id))) {
      return arrayOfProductId.push(product.id)
    }
    return arrayOfProductId
  })
  return {
    ...state,
    client: {
      ...client,
      products: [...previousProduct, ...arrayOfProductId]
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