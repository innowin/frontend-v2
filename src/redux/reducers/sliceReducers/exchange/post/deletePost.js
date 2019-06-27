const success = (state, action) => {
  const {postId, postParentId} = action.payload
  const exchangeId = postParentId
  const prevPosts = state.list[exchangeId] && state.list[exchangeId].posts
  const prevPostsContent = prevPosts && prevPosts.content
  delete prevPostsContent[postId]
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeId]: {
        ...state.list[exchangeId],
        posts: {
          content: {...prevPostsContent},
          isLoading: false,
          error: null,
        },
      },
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
  success,
}