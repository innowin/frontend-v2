const base = (state, action) => {
  const {postId} = action.payload
  const prevPost = state.list[postId]
  return {
    ...state,
    list: {
      ...state.list,
      [postId]: {...prevPost, error: null, isLoading: true},
    },
  }
}

const success = (state, action) => {
  const {data, postId} = action.payload
  const prevPost = state.list[postId]
  return {
    ...state,
    list: {
      ...state.list,
      [postId]: {
        ...prevPost,
        ...data,
        isLoading: false,
        error: null,
      },
    },
  }
}

const error = (state, action) => {
  const {message, postId} = action.payload
  const prevPost = state.list[postId]
  return {
    ...state,
    list: {
      ...state.list,
      [postId]: {...prevPost, isLoading: true, error: message},
    },
  }
}

export default {
  base,
  success,
  error,
}