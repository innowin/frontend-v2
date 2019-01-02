const success = (state, action) => {
  const {data, postParentId} = action.payload
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

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success
}