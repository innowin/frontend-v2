import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {parentId, commentParentType, data} = action.payload || {}
  const previousComment = (state.list[parentId] && state.list[parentId].comments) || []
  const previousCommentCount = (state.list[parentId] && state.list[parentId].comments_count)

  if (commentParentType === constants.COMMENT_PARENT.POST) {
    const newCommentsCount = previousCommentCount + 1
    return {
      ...state,
      list: {
        ...state.list,
        [parentId]: {
          ...state.list[parentId],
          comments_count: newCommentsCount,
          comments: [...previousComment, data.id],
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