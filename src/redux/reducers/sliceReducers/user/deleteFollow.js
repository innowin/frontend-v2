import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {followOwnerId, followOwnerType, followId} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousSocial = (state[followOwnerId] && state[followOwnerId].social) || {follows: {}}
  const previousFollows = (state[followOwnerId] && state[followOwnerId].social && state[followOwnerId].social.follows) || defaultObject2

  if(followOwnerType === constants.USER_TYPES.PERSON) {
    const newDeletedFollows = previousFollows.content.filter(id => id !== followId);
    return {
      ...state,
      [followOwnerId]: {
        ...state[followOwnerId],
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
  else{
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