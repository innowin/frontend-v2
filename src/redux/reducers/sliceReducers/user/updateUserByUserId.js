const base = (state, action) => {
  const {userId} = action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const previousUser = (state.list[userId] && state.list[userId].user) || defaultObject

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        user: {
          ...previousUser,
          isLoading: true
        }
      }
    }
  }
}

const success = (state, action) => {
  const {identity, data} = action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const previousUser = (state.list[identity] && state.list[identity].user) || defaultObject

  return {
    ...state,
    list: {
      ...state.list,
      [identity]: {
        ...state.list[identity],
        user: {
          ...previousUser,
          content: {...previousUser.content, ...data},
          isLoading: false,
          error: null
        }
      }
    }
  }
}

const error = (state, action) => {
  const {userId, message} = action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const previousUser = (state.list[userId] && state.list[userId].user) || defaultObject

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        user: {
          ...previousUser,
          isLoading: false,
          error: message
        }
      }
    }
  }
}

export default {
  base,
  success,
  error,
}