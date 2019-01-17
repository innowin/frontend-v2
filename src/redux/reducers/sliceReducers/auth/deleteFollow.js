const base = (state, action) => {
}

const success = (state, action) => {
  const {followId} = action.payload || {}
  const client = {...state.client}
  const previousSocial= (client && client.social) || {}
  const previousFollows = (client && client.social && client.social.follows) || []

  const newDeletedFollows = previousFollows.filter(id => id !== followId);
  return {
    ...state,
    client: {
      ...client,
      social:{
        ...previousSocial,
        follows: [...newDeletedFollows]
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