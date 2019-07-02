const base = (state, action) => {
  const {postId} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [postId]: {
        ...state.list[postId],
        proposals: {
          list: state.list[postId] && state.list[postId].proposals && state.list[postId].proposals.list ? [...state.list[postId].proposals.list] : [],
          loading: true,
        },
      },
    },
  }
}

const success = (state, action) => {
  const {data, postId} = action.payload
  const ids = data.reduce((sum, pro) => {
    return [...sum, pro.id]
  }, [])
  return {
    ...state,
    list: {
      ...state.list,
      [postId]: {
        ...state.list[postId],
        proposals: {
          list: [...ids],
          loading: false,
        },
      },
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