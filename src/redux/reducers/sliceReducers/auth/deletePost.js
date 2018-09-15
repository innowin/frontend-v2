const base = (state, action) => {
}

const success = (state, action) => {
  const {postId} = action.payload || {}
  const {client} = state
  const previousPost = (client && client.posts) || []

  const newDeletedPosts = previousPost.filter(id => id !== postId);
  return {
    ...state,
    client: {
      ...client,
      posts: [...newDeletedPosts]
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