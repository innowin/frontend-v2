const success = (state, action) => {
  const {data, postParentId} = action.payload
  const indexedPost = {}
  const postResults = data.results
  postResults.forEach(post => {
    const prevPost = state.list[post.id]
    indexedPost[post.id] = {...prevPost, ...post, error: null}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedPost,
    },
    groupedByExchange: {
      ...state.groupedByExchange,
      [postParentId]: {
        ...indexedPost,
      }
    }
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