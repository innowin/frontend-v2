import constants from "../../../../consts/constants";

const base = (state, action) => {
  const {postOwnerId, postOwnerType} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousPost = (state[postOwnerId] && state[postOwnerId].posts) || defaultObject2

  if(postOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      [postOwnerId]: {
        ...state[postOwnerId],
        posts: {
          ...previousPost,
          isLoading: true,
          error: null
        }
      }
    }
  }
  else{
    return state
  }
}

const success = (state, action) => {
}

const error = (state, action) => {
  const {postOwnerId, postOwnerType, message} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousPost = (state[postOwnerId] && state[postOwnerId].posts) || defaultObject2

  if(postOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      [postOwnerId]: {
        ...state[postOwnerId],
        posts: {
          ...previousPost,
          isLoading: false,
          error: message
        }
      }
    }
  }
  else{
    return state
  }
}

export default {
  base,
  success,
  error,
}