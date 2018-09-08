const success = (state, action) => {
  const {data} = action.payload
  const exchangeId = data.post_parent
  const prevPosts = state[exchangeId] && state[exchangeId].posts
  const prevPostsContent = prevPosts && prevPosts.content
  return {
    ...state,
    [exchangeId]: {
      ...state[exchangeId],
      posts: {
        content: [data.id, ...prevPostsContent],
        isLoading: false,
        error: null
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