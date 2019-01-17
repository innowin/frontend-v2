const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const client = {...state.client}

  return {
    ...state,
    client: {
      ...client,
      user: {...client.user, ...data}
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