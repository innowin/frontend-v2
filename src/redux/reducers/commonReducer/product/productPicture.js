import initialState from '../../initialState';
import types from '../../../actions/types';
import pushAnObjToStateList from "../../sliceReducers/utilsSlices/pushAnObjToStateList";
import appendListToStateList from "../../sliceReducers/utilsSlices/appendListToStateList"


const productPicture = (state = initialState.common.product.productPicture, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.CREATE_PRODUCT_PICTURE:
      return pushAnObjToStateList.success(state, action)
    case types.SUCCESS.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID:
      return appendListToStateList.success(state, action)

    case types.RESET:
      return initialState.common.product.productPicture
    default:
      return state
  }
}

export default productPicture