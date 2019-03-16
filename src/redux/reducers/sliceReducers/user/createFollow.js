const base = (state, action) => {
}

const success = (state, action) => {
  const {followOwnerId, data} = action.payload || {}
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
            content: [...previousFollows.content, data.id],
            isLoading: false,
            error: null
          }
        }
      }
    }
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}