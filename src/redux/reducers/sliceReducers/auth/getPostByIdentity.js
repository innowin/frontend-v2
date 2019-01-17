const base = (state, action) => {
}

const success = (state, action) => {
  const {data, postIdentity} = action.payload || {}
  const client = {...state.client}
  const previousPost = (client && client.posts) || []

  const arrayOfPostId = []
  data.map(post => {
    if (postIdentity === state.client.identity.content && (!previousPost.includes(post.id))) {
      return arrayOfPostId.push(post.id)
    }
    return arrayOfPostId
  })
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