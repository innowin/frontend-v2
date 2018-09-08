import initialState from '../../initialState';
import types from '../../../actions/types';
import pushAnObjToStateList from '../../sliceReducers/utilsSlices/pushAnObjToStateList'
import updateListForAnObj from '../../sliceReducers/utilsSlices/updateListForAnObj'
import createAnObj from '../../sliceReducers/utilsSlices/createAnObj'


const products = (state = initialState.common.product.products, action) => {
  const {list} = state
  switch (action.type) {

      /** <-------------- getProduct -------------- **/
    case types.SUCCESS.COMMON.GET_PRODUCT_INFO: {
      return pushAnObjToStateList.success(state, action)
    }
      /** --------------- getProduct -------------- **/

      /** <-------------- updateProduct ----------- **/
    case types.SUCCESS.COMMON.UPDATE_PRODUCT: {
      return updateListForAnObj.success(state, action)
    }
      /** --------------- updateProduct ----------> **/


      /** --------------- createProduct ----------> **/
    case types.COMMON.CREATE_PRODUCT:
      return createAnObj.base(state, action)

    case types.SUCCESS.COMMON.CREATE_PRODUCT: {
      return createAnObj.success(state, action)
    }
      /** --------------- createProduct ----------> **/


      /** < ---------------- addPictureIdToProduct -------------- **/
    case types.COMMON.ADD_PICTURE_ID_TO_PRODUCT: {
      const {productId, pictureId} = action.payload
      const oldProduct = list[productId]
      const newProduct = oldProduct.pictures ? {
        ...oldProduct,
        pictures: [...oldProduct.pictures, pictureId]
      } : {
        ...oldProduct,
        pictures: [pictureId]
      }
      return {
        ...state,
        list: {
          ...list,
          [productId]: newProduct
        }
      }
    }
      /**  ---------------- addPictureIdToProduct -------------- > **/


      /**  <----------------addCertificateIdToProduct --------------  **/
    case types.COMMON.ADD_HASH_TAG_ID_TO_PRODUCT: {
      const {hashTagId, parentId} = action.payload
      const oldProduct = list[parentId]

      const newProduct = oldProduct.hashTags ? {
        ...oldProduct,
        hashTags: [...oldProduct.hashTags, hashTagId]
      } : {
        ...oldProduct,
        hashTags: [hashTagId]
      }

      return {
        ...state,
        list: {
          ...list,
          [parentId]: newProduct
        }
      }
    }
      /**  ---------------- addCertificateIdToProduct -------------- > **/


      /**  <--------------- setNowCreatedProductToNull --------------  **/
      // case types.COMMON.SET_NOW_CREATED_PRODUCT_TO_NULL:
      //     return {
      //         ...state,
      //         nowCreatedId: null
      //     }
      /**  ---------------- setNowCreatedProductToNull -------------- > **/

    default:
      return state
  }
}

export default products