const base = (state, action) => {
}

const success = (state, action) => {
  const {data, postOwnerId} = action.payload || {}
  const client = {...state.client}
  const previousPost = (client && client.posts) || []

  const arrayOfPostId = []

  const clientId = state.client.identity.content
  if (postOwnerId === clientId && (!previousPost.includes(data.id))) {
    arrayOfPostId.push(data.id)
  }
  return {
    ...state,
    client: {
      ...client,
      // posts: [...previousPost, ...arrayOfPostId],
      posts: arrayOfPostId,
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