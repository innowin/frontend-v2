const base = (state, action) => {
}

const success = (state, action) => {
  const {postId} = action.payload || {}
  const client = {...state.client}
  const previousPost = (client && client.posts) || {}
  delete previousPost[postId]
  return {
    ...state,
    client: {
      ...client,
      posts: [...previousPost],
    },
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}