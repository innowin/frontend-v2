import constants from "src/consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, fileParentType} = action.payload
  const fileRelatedParentId = data.file_related_parent
  const previousPost = state.list[fileRelatedParentId] || {post_files_array: []}

  if (fileParentType === constants.FILE_PARENT.POST) {
    let finalData = []
    if (previousPost.post_files_array) {
      finalData = [...previousPost.post_files_array]
      if (!finalData.includes(data)) {
        finalData.map(fileFinal => {
          if (fileFinal.id === data.id) {
            return data
          } else {
            return fileFinal
          }
        })
        if (!finalData.includes(data)) {
          finalData.push(data)
        }
      }
    } else {
      finalData = [data]
    }
    return {
      ...state,
      list: {
        ...state.list,
        [fileRelatedParentId]: {
          ...previousPost,
          post_files_array: finalData,
        }
      }
    }
  } else {
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