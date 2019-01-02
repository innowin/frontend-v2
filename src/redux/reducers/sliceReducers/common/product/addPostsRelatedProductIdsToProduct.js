const base = (state, action) => {
}

const success = (state, action) => {
  const {data, postRelatedProductId} = action.payload
  let arrOfIds = []
  data.forEach(id => arrOfIds.push(id.id))
  const indexedProduct = {}
  const prevProduct = state.list[postRelatedProductId]
  indexedProduct[postRelatedProductId] = {...prevProduct, relatedPosts: arrOfIds, error: null, isLoading: false}
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedProduct,
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