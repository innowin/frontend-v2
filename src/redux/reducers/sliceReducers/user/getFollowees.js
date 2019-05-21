const base = (state, action) => {
  return {...state}
}

const success = (state, action) => {
  const {followOwnerId, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  if (followOwnerId) {
    const previousSocial = (state.list[followOwnerId] && state.list[followOwnerId].social) || {follows: {}}
    const previousFollows = (state.list[followOwnerId] && state.list[followOwnerId].social && state.list[followOwnerId].social.follows) || defaultObject2

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
              error: null,
            },
          },
        },
      },
    }
  }
  else return {...state}
}

const error = (state, action) => {
  return {...state}
}

export default {
  success,
  error,
  base,
}