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
          isLoading: false,
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
  const {postOwnerId, postOwnerType, postId} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousPost = (state[postOwnerId] && state[postOwnerId].posts) || defaultObject2

  if(postOwnerType === constants.USER_TYPES.PERSON) {
    const newDeletedPosts = previousPost.content.filter(id => id !== postId);
    return {
      ...state,
      [postOwnerId]: {
        ...state[postOwnerId],
        posts: {
          ...previousPost,
          content: [...newDeletedPosts],
          isLoading: false,
          error: null
        }
      }
    }
  }
  else{
    return state
  }
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