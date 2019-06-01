const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const commentReplied = data.comment_replied_to
  let prevCommentReplied = undefined

  if (commentReplied) {
    prevCommentReplied = state.list[commentReplied]
    const prevComments = prevCommentReplied.comments ? prevCommentReplied.comments : []
    return {
      ...state,
      list: {
        ...state.list,
        [data.id]: {...data, isLoading: false, error: null, comments: []},
        [commentReplied]: {
          ...prevCommentReplied,
          comments: [...new Set([...prevComments, data.id])],
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