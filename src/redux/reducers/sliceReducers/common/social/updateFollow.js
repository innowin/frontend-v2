const base = (state, action) => {
  const {followId} = action.payload || []
  const previousFollows = (state && state.follows) || {}
  const previousFollowsList = (previousFollows && state.follows.list) || {}
  const previousFollow = (previousFollowsList && state.follows.list[followId]) || {}

  return {
    ...state,
    follows: {
      ...previousFollows,
      list: {
        ...previousFollowsList,
        [followId]:{
          ...previousFollow,
          isLoading: true,
          error: null,
        }
      }
    }
  }
}

const success = (state, action) => {
  const {followId, data} = action.payload || []
  const previousFollows = (state && state.follows) || {}

  return {
    ...state,
    follows: {
      ...previousFollows,
      list: {
        [followId]: {
          ...data,
          isLoading: false,
          error: null,
        }
      }
    }
  }
}

const error = (state, action) => {
  const {message, followId} = action.payload || []
  const previousFollows = (state && state.follows) || {}
  const previousFollowsList = (previousFollows && state.follows.list) || {}
  const previousFollow = (previousFollowsList && state.follows.list[followId]) || {}

  return {
    ...state,
    follows: {
      ...previousFollows,
      list: {
        ...previousFollowsList,
        [followId]:{
          ...previousFollow,
          isLoading: false,
          error: message,
        }
      }
    }
  }
}

export default {
  success,
  error,
  base
}