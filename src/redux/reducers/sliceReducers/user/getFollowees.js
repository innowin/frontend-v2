import constants from "../../../../consts/constants";

const base = (state, action) => {
  const {followOwnerId, followOwnerType} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
  const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject2

  if (followOwnerType === constants.USER_TYPES.USER) {
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
              isLoading: true,
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

const success = (state, action) => {
  const {followOwnerId, followOwnerType, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
  const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject2

  if (followOwnerType === constants.USER_TYPES.USER) {
    const arrayOfFolloweesId = data.map(follow => follow.id)
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
              content: [...new Set([...previousFollows.content, ...arrayOfFolloweesId])],
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
  const {followOwnerId, followOwnerType, message} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
  const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject2

  if (followOwnerType === constants.USER_TYPES.USER) {
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
              isLoading: false,
              error: message
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

export default {
  success,
  error,
  base
}