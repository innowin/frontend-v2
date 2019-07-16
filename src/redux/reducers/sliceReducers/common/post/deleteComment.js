import constants from "src/consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {parentId, commentParentType, commentId} = action.payload || {}
  const previousComment = (state.list[parentId] && state.list[parentId].comments)
  const previousCommentCount = (state.list[parentId] && state.list[parentId].comments_count)

  if (commentParentType === constants.COMMENT_PARENT.POST) {
    const newDeletedComments = previousComment && previousComment.filter(id => id !== commentId)
    const newCommentsCount = previousCommentCount - 1
    return {
      ...state,
      list: {
        ...state.list,
        [parentId]: {
          ...state.list[parentId],
          comments_count: newCommentsCount,
          comments: [...newDeletedComments],
        }
      }
    }
  }
  else {
    return state
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}