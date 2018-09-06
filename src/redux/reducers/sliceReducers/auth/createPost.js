import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, postOwnerType} = action.payload || {}
  const {client} = state
  const previousPost = (client && client.posts) || []

  if(postOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      client: {
        ...client,
        posts: [...previousPost, data.id]
      }
    }
  }
  else{
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