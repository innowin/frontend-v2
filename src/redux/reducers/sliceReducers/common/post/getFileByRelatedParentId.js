import constants from "src/consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, fileRelatedParentId, fileParentType} = action.payload
  const previousPost = state.list[fileRelatedParentId] || {post_files_array: []}
  if (fileParentType === constants.FILE_PARENT.POST) {
    return {
      ...state,
      list: {
        ...state.list,
        [fileRelatedParentId]: {
          ...previousPost,
          post_files_array: data,
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