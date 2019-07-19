const success = (state, action) => {
  const {data} = action.payload
  const client = {...state.client}
  const previousStream = client.stream ? {...client.stream} : {}
  const ids = data.reduce((sum, post) => {
    return {...sum, [post.id]: post.id}
  }, {})

  return {
    ...state,
    client: {
      ...client,
      stream: {...previousStream, ...ids},
    },
  }
}

export default {
  success,
}