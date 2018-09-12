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
  const {followId} = action.payload || []
  const previousFollows = (state && state.follows) || {}

  const {[`${followId}`]: deleted, ...deleteRest} = state.follows.list
  return {
    ...state,
    follows: {
      ...previousFollows,
      list: {...deleteRest}
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