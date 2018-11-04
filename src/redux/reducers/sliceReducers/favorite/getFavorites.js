const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedFavorite = {}
  data.forEach(favorite => {
    const prevFavorite = state.list[favorite.id]
    indexedFavorite[favorite.id] = {...prevFavorite, ...favorite, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedFavorite,
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