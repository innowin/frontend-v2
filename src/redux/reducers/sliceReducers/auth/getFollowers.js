const base = (state, action) => {
}

const success = (state, action) => {
  const {
    data,
    followOwnerIdentity,
    // followOwnerType
  } = action.payload || {}
  const client = {...state.client}
  const previousFollows = (client && client.social && client.social.follows) || []

  const arrayOfFollowersId = []
  data.map(follower => {
    if (followOwnerIdentity === state.client.identity.content && (!previousFollows.includes(follower.id))) {
      return arrayOfFollowersId.push(follower.id)
    }
    return arrayOfFollowersId
  })
  return {
    ...state,
    client: {
      ...client,
      social: {
        ...client.social,
        follows: [...previousFollows, ...arrayOfFollowersId]
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