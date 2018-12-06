import constants from "../../../../consts/constants";

const base = (state, action) => {
  const {postOwnerId, postOwnerType} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2

  if (postOwnerType === constants.USER_TYPES.PERSON) {
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
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2

  if (postOwnerType === constants.USER_TYPES.PERSON) {
    const arrayOfPostId = data.map(post => post.id)
    return {
      ...state,
      list: {
        ...state.list,
        [postOwnerId]: {
          ...state.list[postOwnerId],
          posts: {
            ...previousPost,
            // content: [...new Set([...previousPost.content, ...arrayOfPostId])],
            cotnent: arrayOfPostId,
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
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2

  //TODO: mohammad check userId is not undefined and find current userId
  if (postOwnerType === constants.USER_TYPES.PERSON) {
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