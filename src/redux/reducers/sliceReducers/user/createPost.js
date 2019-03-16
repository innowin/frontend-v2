const base = (state, action) => {
}

const success = (state, action) => {
  const {postOwnerId, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [postOwnerId]: {
        ...state.list[postOwnerId],
        posts: {
          ...previousPost,
          content: [...previousPost.content, data.id],
          isLoading: false,
          error: null
        }
      }
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