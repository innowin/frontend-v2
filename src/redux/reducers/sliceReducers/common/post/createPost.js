const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || []

  // TODO: mohammad full identity_object or just id
  return {
    ...state,
    list:{
      ...state.list,
      [data.id]: {...data, isLoading: false, error: null}
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