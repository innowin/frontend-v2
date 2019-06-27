const base = (state, action) => {
  const {postOwnerId} = action.payload || {}
  const defaultObject2 = {content: {}, isLoading: false, error: null}
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
          error: null,
        },
      },
    },
  }
}

const success = (state, action) => {
  const {postOwnerId, data} = action.payload || {}
  const defaultObject2 = {content: {}, isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2
  const postIds = data.reduce((sum, post) => {
    if (post.id !== 0)
      return {...sum, [post.id]: post.id}
    else return {...sum}
  }, {})

  const identity = {
    ...state.list[postOwnerId],
    posts: {
      ...previousPost,
      content: previousPost.content ? {...previousPost.content, ...postIds} : {...postIds},
      isLoading: false,
      error: null,
    },
  }

  return {
    ...state,
    list: {
      ...state.list,
      [postOwnerId]: {...identity},
    },
  }
}

const error = (state, action) => {
  const {postOwnerId, message} = action.payload || {}
  const defaultObject2 = {content: {}, isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2

  //TODO: mohammad check userId is not undefined and find current userId
  return {
    ...state,
    list: {
      ...state.list,
      [postOwnerId]: {
        ...state.list[postOwnerId],
        posts: {
          ...previousPost,
          isLoading: false,
          error: message,
        },
      },
    },
  }
}

export default {
  base,
  success,
  error,
}