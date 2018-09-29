import initialState from '../../initialState';
import types from '../../../actions/types';
import pushAnObjToStateList from '../../sliceReducers/utilsSlices/pushAnObjToStateList'
import updateListForAnObj from '../../sliceReducers/utilsSlices/updateListForAnObj'
import createAnObj from '../../sliceReducers/utilsSlices/createAnObj'
import setRelatedObjIdForListItem from '../../sliceReducers/utilsSlices/setRelatedObjIdForListItem'
import setRelatedObjectsForAnObj from '../../sliceReducers/utilsSlices/setRelatedObjectsForAnObj'


const products = (state = initialState.common.product.products, action) => {
  switch (action.type) {

      /** <-------------- getProduct -------------- **/
    case types.SUCCESS.COMMON.GET_PRODUCT_INFO:
      return pushAnObjToStateList.success(state, action)
      /** --------------- getProduct -------------- **/

      /** <-------------- updateProduct ----------- **/
    case types.SUCCESS.COMMON.UPDATE_PRODUCT:
      return updateListForAnObj.success(state, action)
      /** --------------- updateProduct ----------> **/

      /** --------------- createProduct ----------> **/
    case types.COMMON.CREATE_PRODUCT:
      return createAnObj.base(state, action)

    case types.SUCCESS.COMMON.CREATE_PRODUCT:
      return createAnObj.success(state, action)
      /** --------------- createProduct ----------> **/

      /** < ---------------- addPictureIdToProduct -------------- **/
    case types.COMMON.ADD_PICTURE_ID_TO_PRODUCT:
      return setRelatedObjIdForListItem.success(state, action, 'pictures')
      /**  ---------------- addPictureIdToProduct -------------- > **/

      /**  <----------------addCertificateIdToProduct --------------  **/
    case types.COMMON.ADD_HASH_TAG_ID_TO_PRODUCT:
      return setRelatedObjIdForListItem.success(state, action, 'hashTags')
      /**  ---------------- addCertificateIdToProduct -------------- > **/

    case types.SUCCESS.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID:
      return setRelatedObjectsForAnObj.success(state, action, 'pictures')

    case types.RESET:
      return initialState.common.product.products

    default:
      return state
  }
}

export default products