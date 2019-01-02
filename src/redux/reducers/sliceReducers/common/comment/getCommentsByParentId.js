const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedComment = {}
  data.forEach(comment => {
    const prevComment = state.list[comment.id]
    const commentReplied = comment.comment_replied
    indexedComment[comment.id] = {
      ...indexedComment[comment.id], ...prevComment, ...comment,
      error: null,
      isLoading: false
    }
    if (commentReplied !== null) {
      const prevReplied = state.list[commentReplied.id]
      indexedComment[commentReplied.id] = prevReplied
          ? {
            ...prevReplied,
            comments: prevReplied.comments
                ? [...new Set([...prevReplied.comments, ...[comment.id]])]
                : [comment.id]
          }
          : indexedComment[commentReplied.id]
              ? {
                ...indexedComment[commentReplied.id],
                comments: indexedComment[commentReplied.id].comments
                    ? [...new Set([...indexedComment[commentReplied.id].comments, ...[comment.id]])]
                    : [comment.id]
              }
              : {comments: [comment.id]}
    }
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