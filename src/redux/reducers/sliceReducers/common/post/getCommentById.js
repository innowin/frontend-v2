const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const parentId = data.comment_parent.id
  const previousPost = state.list[parentId] || {comments: []}
  const arrayOfCommentId = [...new Set([...previousPost.comments, ...data.id])]
  return {
    ...state,
    list: {
      ...state.list,
      [parentId]: {
        ...previousPost,
        comments: arrayOfCommentId,
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