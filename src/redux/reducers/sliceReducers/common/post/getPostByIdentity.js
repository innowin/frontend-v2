const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || []
  const indexedPost = {}

  data.map(post => indexedPost[post.id] = {...post, error: null, isLoading: false})
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedPost,
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