import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {followOwnerId, followOwnerType, followId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
  const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject2

  if (followOwnerType === constants.USER_TYPES.USER) {
    const newDeletedFollows = previousFollows.content.filter(id => id !== followId);
    return {
      ...state,
      list: {
        ...state.list,
        [followOwnerId]: {
          ...state.list[followOwnerId],
          social: {
            ...previousSocial,
            follows: {
              ...previousFollows,
              content: [...newDeletedFollows],
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