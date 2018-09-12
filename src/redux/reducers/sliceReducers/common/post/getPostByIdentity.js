const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedPost = {}
  data.forEach(post => {
    const prevPost = state.list[post.id]
    indexedPost[post.id] = {...prevPost, ...post, error: null, isLoading: false}
  })
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