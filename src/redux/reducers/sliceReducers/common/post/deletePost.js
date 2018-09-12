const base = (state, action) => {
  const {postId} = action.payload
  const prevPost = state.list[postId]
  return {
    ...state,
    list:{
      ...state.list,
      [postId]: {...prevPost, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {postId} = action.payload
  const {[`${postId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
  }
}

const error = (state, action) => {
  const {message, postId} = action.payload
  const prevPost = state.list[postId]
  return {
    ...state,
    list:{
      ...state.list,
      [postId]: {...prevPost, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}