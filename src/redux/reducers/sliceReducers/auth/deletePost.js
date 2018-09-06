import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {postOwnerType, postId} = action.payload || {}
  const {client} = state
  const previousPost = (client && client.posts) || []

  if(postOwnerType === constants.USER_TYPES.PERSON) {
    const newDeletedPosts = previousPost.filter(id => id !== postId);
    return {
      ...state,
      client: {
        ...client,
        posts: [...newDeletedPosts]
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