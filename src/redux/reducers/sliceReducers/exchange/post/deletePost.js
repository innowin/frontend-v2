const SUCCESS = (state, action) => {
  const {postId, postParentId, postParentType} = action.payload
  if (postParentType === 'exchange') {
    const exchangeId = postParentId
    const prevPosts = state[exchangeId] && state[exchangeId].posts
    const prevPostsContent = prevPosts && prevPosts.content
    const newPosts = prevPostsContent.filter(id => id !== postId)
    return {
      ...state,
      [exchangeId]: {
        ...state[exchangeId],
        posts: {
          content: newPosts,
          isLoading: false,
          error: null
        }
      }
    }
  } else return {
    ...state
  }
}

const ERROR = (state, action) => {

}

const BASE = (state, action) => {

}

const deletePost = {
  BASE,
  ERROR,
  SUCCESS
}

export default deletePost