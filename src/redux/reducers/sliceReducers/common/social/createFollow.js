const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || []
  const previousFollows = (state && state.follows) || {}

  return {
    ...state,
    follows:{
      ...previousFollows,
      list:{
        ...previousFollows.list,
        [data.id]: {...data, isLoading: false, error: null}
      }
    }
  }
}

const error = (state, action) => {
}

export default {
  success,
  error,
  base
}