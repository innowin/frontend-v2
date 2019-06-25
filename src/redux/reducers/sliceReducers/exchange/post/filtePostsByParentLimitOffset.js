const success = (state, action) => {
  const {data, postParentId} = action.payload
  // const postIds = data.map(post => post.id)
  const exchangeId = postParentId

  const postIds = data.reduce((sum, post) => {
    if (post.id !== 0)
      return {...sum, [post.id]: post.id}
    else return {...sum}
  }, {})


  return {
    ...state,
    list: {
      ...state.list,
      [exchangeId]: {
        ...state.list[exchangeId],
        posts: {
          content: state.list[exchangeId].posts && state.list[exchangeId].posts.content ? {...state.list[exchangeId].posts.content, ...postIds} : {...postIds},
          isLoading: false,
          error: null,
        },
      },
    },
  }
}

const error = (state, action) => {

}

const base = (state, action) => {
  const {postParentId} = action.payload
  const exchangeId = postParentId
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeId]: {
        ...state.list[exchangeId],
        posts: state.list[exchangeId] ? {
              ...state.list[exchangeId].posts,
              isLoading: true,
              error: null,
            }
            : {
              content: {},
              isLoading: true,
              error: null,
            },
      },
    },
  }
}

export default {
  base,
  error,
  success,
}