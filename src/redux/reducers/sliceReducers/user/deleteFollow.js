import constants from "../../../../consts/constants";

const base = (state, action) => {
  const {followOwnerId, followOwnerType} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousSocial = (state[followOwnerId] && state[followOwnerId].social) || {follows: {}}
  const previousFollows = (state[followOwnerId] && state[followOwnerId].social && state[followOwnerId].social.follows) || defaultObject2

  if(followOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      [followOwnerId]: {
        ...state[followOwnerId],
        social: {
          ...previousSocial,
          follows: {
            ...previousFollows,
            isLoading: true,
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
  const {followOwnerId, followOwnerType, message} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousSocial = (state[followOwnerId] && state[followOwnerId].social) || {follows: {}}
  const previousFollows = (state[followOwnerId] && state[followOwnerId].social && state[followOwnerId].social.follows) || defaultObject2

  if(followOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      [followOwnerId]: {
        ...state[followOwnerId],
        social: {
          ...previousSocial,
          follows: {
            ...previousFollows,
            isLoading: false,
            error: message
          }
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