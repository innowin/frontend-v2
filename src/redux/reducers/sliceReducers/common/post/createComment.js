import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {parentId, commentParentType, data} = action.payload || {}
  const previousComment = (state.list[parentId] && state.list[parentId].comments) || []

  if (commentParentType === constants.COMMENT_PARENT.POST) {
    return {
      ...state,
      list: {
        ...state.list,
        [parentId]: {
          ...state.list[parentId],
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