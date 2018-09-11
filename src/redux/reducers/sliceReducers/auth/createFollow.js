const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const {client} = state
  const previousSocial = (client && client.social) || {}
  const previousFollows = (client && client.social && client.social.follows) || []

  return {
    ...state,
    client: {
      ...client,
      social: {
        ...previousSocial,
        follows: [...previousFollows, data.id]
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