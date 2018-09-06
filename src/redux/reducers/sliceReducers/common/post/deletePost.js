const base = (state, action) => {
  const {postId} = action.payload || []

  return {
    ...state,
    list:{
      ...state.list,
      [postId]: {...state.list[postId], error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {postId} = action.payload || []

  const {[`${postId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
  }
}

const error = (state, action) => {
  const {message, postId} = action.payload || []

  return {
    ...state,
    list:{
      ...state.list,
      [postId]: {...state.list[postId], isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}