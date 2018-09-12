const success = (state, action) => {
  const {postId, postParentId} = action.payload
  const exchangeId = postParentId
  const prevPosts = state.list[exchangeId] && state.list[exchangeId].posts
  const prevPostsContent = prevPosts && prevPosts.content
  const newPosts = prevPostsContent.filter(id => id !== postId)
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeId]: {
        ...state.list[exchangeId],
        posts: {
          content: newPosts,
          isLoading: false,
          error: null
        }
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