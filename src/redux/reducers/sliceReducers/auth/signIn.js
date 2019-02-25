const base = (state, action) => {
}

const success = (state, action) => {
  const {rememberMe, data} = action.payload
  const {identity} = data || {}
  const client = {...state.client}
  const user_type = identity.identity_type
  return {
    ...state,
    client: {
      ...client,
      identity: {
        content: identity.id,
        isLoading: false,
        error: null
      },
      user_type,
      rememberMe,
      posts: [],
      social: {
        follows: []
      },
      isLoggedIn: true,
      error: null,
    }
  }
}

const error = (state, action) => {
  const {message: errorMessage} = action.payload
  const client = {...state.client}
  return {
    ...state,
    client: {
      ...client,
      error: errorMessage
    }
  }
}

export default {
  base,
  success,
  error,
}