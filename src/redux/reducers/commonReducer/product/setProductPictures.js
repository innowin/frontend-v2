import constants from "src/consts/constants";

const success = (state, action) => {
  const {data, fileRelatedParentId, fileParentType} = action.payload
  if (fileParentType === constants.FILE_PARENT.PRODUCT) {
    return {
      ...state,
      list: {
        ...state.list,
        [fileRelatedParentId]: {
          ...state.list[fileRelatedParentId],
          pictures_array: data,
        }
      }
    }
  }
  else {
    return state
  }
}

export default {
  success,
}