const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedComment = {}
  data.forEach(comment => {
    const prevComment = state.list[comment.id]
    indexedComment[comment.id] = {...prevComment, ...comment, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedComment,
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