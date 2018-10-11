import constants from "../../../../consts/constants";

const base = (state, action) => {
  const {postOwnerId, postOwnerType} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject
  if (postOwnerType === constants.USER_TYPES.ORG) {
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
  else {
    return state
  }
}

const success = (state, action) => {
  const {postOwnerId, postOwnerType, data} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject
  if (postOwnerType === constants.USER_TYPES.ORG) {
    const arrayOfPostId = [data.id]
    return {
      ...state,
      list: {
        ...state.list,
        [postOwnerId]: {
          ...state.list[postOwnerId],
          posts: {
            content: [...new Set([...previousPost.content, ...arrayOfPostId])],
            isLoading: false,
            error: null
          }
        }
      }
    }
  }
  else {
    return state
  }
}

const error = (state, action) => {
  const {postOwnerId, postOwnerType, message} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject
  if (postOwnerType === constants.USER_TYPES.ORG) {
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
  else {
    return state
  }
}

export default {
  base,
  success,
  error,
}