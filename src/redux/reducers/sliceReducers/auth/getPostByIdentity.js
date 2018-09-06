import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, postIdentity, postOwnerType} = action.payload || {}
  const {client} = state
  const previousPost = (client && client.posts) || []

  if(postOwnerType === constants.USER_TYPES.PERSON) {
    const arrayOfPostId = []
    data.map(post => {
      if (postIdentity === state.client.identity.id && (!previousPost.includes(post.id))) {
        return arrayOfPostId.push(post.id)
      }
      return arrayOfPostId
    })
    return {
      ...state,
      client: {
        ...client,
        posts: [...previousPost, ...arrayOfPostId]
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