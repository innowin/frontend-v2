const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const client = {...state.client}
  const previousPost = (client && client.posts) || {}
  const postIds = data.reduce((sum, post) => {
    if (post.id !== 0)
      return {...sum, [post.id]: post.id}
    else return {...sum}
  }, {})

  return {
    ...state,
    client: {
      ...client,
      posts: {...previousPost, postIds},
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