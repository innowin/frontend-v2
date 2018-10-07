import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {postOwnerId, postOwnerType, data} = action.payload || {}
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
            content: [...previousPost.content, data.id],
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
}

export default {
  base,
  success,
  error,
}