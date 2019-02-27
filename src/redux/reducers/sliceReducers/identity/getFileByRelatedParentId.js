import constants from "src/consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, fileRelatedParentId, fileParentType} = action.payload
  const previousIdentity = state.list[fileRelatedParentId]
  let profileImg = undefined, bannerImg = undefined
  for (let file of data) {
    if (data.category === constants.CREATE_FILE_CATEGORIES.IDENTITY.BANNER) {
      profileImg = file.id
    }
    if (data.category === constants.CREATE_FILE_CATEGORIES.IDENTITY.PROFILE_PICTURE) {
      bannerImg = file.id
    }
  }
  if (fileParentType === constants.FILE_PARENT.IDENTITY) {
    return {
      ...state,
      list: {
        ...state.list,
        [fileRelatedParentId]: {
          ...previousIdentity,
          profileImg,
          bannerImg,
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