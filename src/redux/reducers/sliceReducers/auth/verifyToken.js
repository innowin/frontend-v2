const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const {user, profile, identity} = data || {}
  const {client} = state

  return {
    ...state,
    client: {
      ...client,
      user,
      profile,
      identity,
    }
  }
}

const error = (state, action) => {
  const {message} = action.payload || {}
  const {client} = state

  return {
    ...state,
    client: {
      ...client,
      error: {
        message
      }
    }
  }
}

export default {
  base,
  success,
  error,
}