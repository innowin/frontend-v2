const base = (state, action) => {
  const {postOwnerId} = action.payload || {}
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
          isLoading: true,
          error: null
        }
      }
    }
  }
}

const success = (state, action) => {
  const {postOwnerId, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2

  const arrayOfPostId = [data.id]
  return {
    ...state,
    list: {
      ...state.list,
      [postOwnerId]: {
        ...state.list[postOwnerId],
        posts: {
          ...previousPost,
          // content: [...new Set([...previousPost.content, ...arrayOfPostId])],
          content: arrayOfPostId,
          isLoading: false,
          error: null
        }
      }
    }
  }
}

const error = (state, action) => {
  const {postOwnerId, message} = action.payload || {}
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
          isLoading: false,
          error: message
        }
      }
    }
  }
}

export default {
  base,
  success,
  error,
}