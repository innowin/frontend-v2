import {createSelector} from "reselect";
import helpers from "src/consts/helperFunctions/helperFunctions"


/**
 returns the list of hashTags of a specific obj
 **/
const getHashTagsByParentId = (state, parentId) => {
  const hashTags = helpers.filterNestedObjByKey(
      state.common.hashTag.objHashTags.list,
      'hashtag_base',
      parentId
  )
  return Object.values(hashTags).map(tag => tag)
}


const makeHashTagSelectorByParentId = () => createSelector(
    getHashTagsByParentId,
    hashTagsArray => hashTagsArray
)

export default makeHashTagSelectorByParentId