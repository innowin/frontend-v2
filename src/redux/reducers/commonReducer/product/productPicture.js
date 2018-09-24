import initialState from '../../initialState';
import types from '../../../actions/types';
import pushAnObjToStateList from "../../sliceReducers/utilsSlices/pushAnObjToStateList";

const productPicture = (state = initialState.common.product.productPicture, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.CREATE_PRODUCT_PICTURE:
      return pushAnObjToStateList.success(state, action)
    case types.RESET:
      return initialState.common.product.productPicture
    default:
      return state
  }
}

export default productPicture