import constants from '../../../../consts/constants'

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
              error: null,
            },
          },
        },
      },
    }
  }
  else {
    return state
  }
}

const success = (state, action) => {
  const {followOwnerId, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
  const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject2

  const arrayOfFollowersId = data.map(follow => follow.id)
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
            content: [...new Set([...previousFollows.content, ...arrayOfFollowersId])],
            isLoading: false,
            error: null,
          },
        },
      },
    },
  }
}

const error = (state, action) => {
  const {followOwnerId, message} = action.payload || {}
  if (followOwnerId) {
    const defaultObject2 = {content: [], isLoading: false, error: null}
    const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
    const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject2

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
              error: message,
            },
          },
        },
      },
    }
  } else return {...state}
}

export default {
  base,
  success,
  error,
}