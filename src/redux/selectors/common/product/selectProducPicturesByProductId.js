import {createSelector} from "reselect";
import helpers from "../../../../consts/helperFunctions/helperFunctions"

const getPictures = (state, productId) => {
  const {list = {}} = state.common.product.productPicture
  return helpers.filterNestedObjByKey(list, 'picture_product', +productId)
}

/**

 **/
const makePictureSelectorByProductId = () => createSelector(getPictures, list => list)

export default makePictureSelectorByProductId