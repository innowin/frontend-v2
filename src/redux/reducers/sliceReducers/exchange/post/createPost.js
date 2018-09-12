const success = (state, action) => {
  const {data} = action.payload
  const exchangeId = data.post_parent
  const prevPosts = state.list[exchangeId] && state.list[exchangeId].posts
  const prevPostsContent = prevPosts && prevPosts.content
  return {
    ...state,
    list:{
      ...state.list,
      [exchangeId]: {
        ...state.list[exchangeId],
        posts: {
          content: [data.id, ...prevPostsContent],
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