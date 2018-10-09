import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, postOwnerType, postOwnerId} = action.payload || {}
  const {client} = state
  const previousPost = (client && client.posts) || []

  const arrayOfPostId = []

  const clientId =  constants.USER_TYPES.PERSON === postOwnerType ? state.client.user && state.client.user.id : state.client.organization && state.client.organization.id
  if (postOwnerId === clientId && (!previousPost.includes(data.id))) {
    return arrayOfPostId.push(data.id)
  }
  return {
    ...state,
    client: {
      ...client,
      posts: [...previousPost, ...arrayOfPostId]
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