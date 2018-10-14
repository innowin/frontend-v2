const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const commentReplied = data.comment_replied
  let prevCommentReplied = undefined

  if (commentReplied !== null) {
    prevCommentReplied = state.list[commentReplied] || {comments: []}
    return {
      ...state,
      list: {
        ...state.list,
        [data.id]: {...data, isLoading: false, error: null, comments: []},
        [commentReplied]: {
          ...prevCommentReplied,
          comments: [...new Set([...prevCommentReplied.comments, data.id])],
        }
      }
    }
  }
  else {
    return {
      ...state,
      list: {
        ...state.list,
        [data.id]: {...data, isLoading: false, error: null, comments: []},
      }
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