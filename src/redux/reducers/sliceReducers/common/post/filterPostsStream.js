const success = (state, action) => {
  // const {data, postParentId} = action.payload
  const {data} = action.payload
  const indexedPost = {}
  data.forEach(post => {
    const prevPost = state.list[post.id]
    indexedPost[post.id] = {...prevPost, ...post, error: null}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedPost,
    },
  }
}

export default {
  success
}