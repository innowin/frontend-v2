import {createSelector} from "reselect";
import helpers from "../../../../consts/helperFunctions/helperFunctions"

const getPictures = (state, productId) => {
  const picturesObj = state.common.product.productPicture.list || {}
  const filteredPicturesObj = helpers.filterNestedObjByKey(picturesObj, 'picture_product', +productId)
  const files = state.common.file.list || {}
  return Object.values(filteredPicturesObj).map((picture = {}) => {
    return {
      ...picture,
      fileUrl: files[picture.picture_media] ? files[picture.picture_media].file : ''
    }
  })
}

/**

 **/
const makePictureSelectorByProductId = () => createSelector(getPictures, list => list)

export default makePictureSelectorByProductId