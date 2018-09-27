const base = (state, action) => {
}

const success = (state, action) => {
  const {data, followOwnerIdentity} = action.payload || {}
  const {client} = state
  const previousFollows = (client && client.social && client.social.follows) || []

  const arrayOfFolloweesId = []
  data.map(follower => {
    if (followOwnerIdentity === state.client.identity.content && (!previousFollows.includes(follower.id))) {
      return arrayOfFolloweesId.push(follower.id)
    }
    return arrayOfFolloweesId
  })
  return {
    ...state,
    client: {
      ...client,
      social: {
        ...client.social,
        follows: [...previousFollows, ...arrayOfFolloweesId]
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