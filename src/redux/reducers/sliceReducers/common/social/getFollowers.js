const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || []
  const previousFollows = (state && state.follows) || {}
  const indexedSocial = {}
  data.map(follow => indexedSocial[follow.id] = {...follow, error: null, isLoading: false})
  return {
    ...state,
    follows:{
      ...previousFollows,
      list: {
        ...previousFollows.list,
        ...indexedSocial,
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