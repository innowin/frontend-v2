const base = (state, action) => {
  const {commentId} = action.payload
  const prevComment = state.list[commentId]
  return {
    ...state,
    list:{
      ...state.list,
      [commentId]: {...prevComment, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {commentId} = action.payload
  const {[`${commentId}`]: deleted, ...deleteRest} = state.list
  const commentReplied = deleted.comment_replied_to
  if(commentReplied !== null) {
    const commentRepliedId = commentReplied.id || commentReplied
    if (deleteRest[commentRepliedId]) {
      const previousComment = deleteRest[commentRepliedId].comments
      const newDeletedComments = previousComment.filter(id => id !== commentId)
      deleteRest[commentRepliedId].comments = [...newDeletedComments]
    }
  }
  return {
    ...state,
    list: {...deleteRest}
  }
}

const error = (state, action) => {
  const {message, commentId} = action.payload
  const prevComment = state.list[commentId]
  return {
    ...state,
    list:{
      ...state.list,
      [commentId]: {...prevComment, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}