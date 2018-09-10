import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, followOwnerType} = action.payload || {}
  const {client} = state
  const previousSocial = (client && client.social) || {}
  const previousFollows = (client && client.social && client.social.follows) || []

  if (followOwnerType === constants.USER_TYPES.PERSON) {
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
  else {
    return state
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}