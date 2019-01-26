import constants from "src/consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {fileParentId, fileParentType, fileId} = action.payload || {}
  const previousFiles = (state.list[fileParentId] && state.list[fileParentId].post_picture_array)

  if (fileParentType === constants.COMMENT_PARENT.POST) {
    const newDeletedFiles = previousFiles.filter(file => file.id !== fileId)
    return {
      ...state,
      list: {
        ...state.list,
        [fileParentId]: {
          ...state.list[fileParentId],
          post_picture_array: [...newDeletedFiles],
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