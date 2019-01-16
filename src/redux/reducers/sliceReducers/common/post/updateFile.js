import constants from "src/consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, fileParentType} = action.payload
  const fileRelatedParentId = data.file_related_parent
  const previousPost = state.list[fileRelatedParentId] || {post_picture_array: []}

  if (fileParentType === constants.FILE_PARENT.POST) {
    let finalData = []
    if (previousPost.post_picture_array && previousPost.post_picture_array.length) {
      for (let prevPostFile of previousPost.post_picture_array){
        for (let newPostFile of data) {
          if (newPostFile.id === prevPostFile.id) {
            finalData.push(newPostFile)
          }
        }
      }
    }
    else {
      finalData = [data]
    }
    return {
      ...state,
      list: {
        ...state.list,
        [fileRelatedParentId]: {
          ...previousPost,
          post_picture_array: finalData,
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