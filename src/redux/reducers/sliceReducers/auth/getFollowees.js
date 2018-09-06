import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, followOwnerIdentity, followOwnerType} = action.payload || {}
  const {client} = state
  const previousFollows = (client && client.social && client.social.follows) || []

  if (followOwnerType === constants.USER_TYPES.PERSON) {
    const arrayOfFolloweesId = []
    data.map(follower => {
      if (followOwnerIdentity === state.client.identity.id && (!previousFollows.includes(follower.id))) {
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
  else{
    return {...state,}
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}