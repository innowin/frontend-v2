import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {followOwnerId, followOwnerType, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSocial = (state[followOwnerId] && state[followOwnerId].social) || {follows: {}}
  const previousFollows = (state[followOwnerId] && state[followOwnerId].social && state[followOwnerId].social.follows) || defaultObject2

  if (followOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      [followOwnerId]: {
        ...state[followOwnerId],
        social: {
          ...previousSocial,
          follows:{
            content: [...previousFollows.content, data.id],
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