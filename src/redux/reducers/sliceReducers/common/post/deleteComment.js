import constants from "src/consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {parentId, commentParentType, commentId} = action.payload || {}
  const previousComment = (state.list[parentId] && state.list[parentId].comments)

  if (commentParentType === constants.COMMENT_PARENT.POST) {
    const newDeletedComments = previousComment.filter(id => id !== commentId);
    return {
      ...state,
      list: {
        ...state.list,
        [parentId]: {
          ...state.list[parentId],
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