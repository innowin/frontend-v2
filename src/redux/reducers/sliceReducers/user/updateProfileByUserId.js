const base = (state, action) => {
  const {userId} = action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const previousProfile = (state.list[userId] && state.list[userId].profile) || defaultObject

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        profile: {
          ...previousProfile,
          isLoading: true
        }
      }
    }
  }
}

const success = (state, action) => {
  const {userId, data} = action.payload || {}

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        profile: {
          content: {...data},
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
  const previousProfile = (state.list[userId] && state.list[userId].profile) || defaultObject

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        profile: {
          ...previousProfile,
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