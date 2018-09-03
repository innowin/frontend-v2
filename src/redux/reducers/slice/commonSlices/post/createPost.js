const SUCCESS = (state, action) => {
  const {data, postParentType} = action.payload
  if (postParentType === 'exchange') {
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
  } else return {
    ...state
  }
}

const ERROR = (state, action) => {

}

const BASE = (state, action) => {

}

const createPost = {
  BASE,
  ERROR,
  SUCCESS
}

export default createPost