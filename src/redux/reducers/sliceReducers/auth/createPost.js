const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const client = {...state.client}
  const previousPost = (client && client.posts) || {}

  return {
    ...state,
    client: {
      ...client,
      posts: {...previousPost, [data.id]: data.id},
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