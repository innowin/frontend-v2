const base = (state, action) => {
  const {token} = action.payload
  const client = {...state.client}

  return {
    ...state,
    client: {
      ...client,
      token
    }
  }
}

const success = (state, action) => {
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}