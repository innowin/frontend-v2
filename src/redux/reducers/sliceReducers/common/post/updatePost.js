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
  const {data, postId} = action.payload || []

  return {
    ...state,
    list:{
      ...state.list,
      [postId]: {...data, isLoading: false, error: null}
    }
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