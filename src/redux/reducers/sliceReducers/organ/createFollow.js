import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {followOwnerId, followOwnerType, data} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
  const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject

  if (followOwnerType === constants.USER_TYPES.ORG) {
    return {
      ...state,
      list: {
        ...state.list,
        [followOwnerId]: {
          ...state.list[followOwnerId],
          social: {
            ...previousSocial,
            follows: {
              content: [...previousFollows.content, data.id],
              isLoading: false,
              error: null
            }
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