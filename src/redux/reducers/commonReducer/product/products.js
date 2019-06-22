import initialState from '../../initialState'
import types from '../../../actions/types'
import pushAnObjToStateList from '../../sliceReducers/utilsSlices/pushAnObjToStateList'
import createAnObj from '../../sliceReducers/utilsSlices/createAnObj'
import setRelatedObjIdForListItem from '../../sliceReducers/utilsSlices/setRelatedObjIdForListItem'
import setRelatedObjectsForAnObj from '../../sliceReducers/utilsSlices/setRelatedObjectsForAnObj'
import getAllProducts from './getAllProducts'
import setProductPictures from './setProductPictures'
import slices from '../../sliceReducers/common/product'


const products = (state = initialState.common.product.products, action) => {
  switch (action.type) {

      /** <-------------- getProduct -------------- **/
    case types.SUCCESS.COMMON.GET_PRODUCT_INFO: {
      console.log('here: ', action.payload)
      return pushAnObjToStateList.success(state, action)
    }

    case types.SUCCESS.COMMON.GET_ALL_PRODUCTS:
      return getAllProducts.success(state, action)

    case types.SUCCESS.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID:
      return setProductPictures.success(state, action)

    case types.SUCCESS.COMMON.POST.FILTER_POSTS_BY_POST_RELATED_PRODUCT:
      return slices.addPostsRelatedProductIdsToProduct.success(state, action)

      /** --------------- createProduct ----------> **/
    case types.COMMON.CREATE_PRODUCT:
      return createAnObj.base(state, action)

    case types.SUCCESS.COMMON.CREATE_PRODUCT:
      return createAnObj.success(state, action)

      /** < ---------------- addPictureIdToProduct -------------- **/
    case types.COMMON.ADD_PICTURE_ID_TO_PRODUCT:
      return setRelatedObjIdForListItem.success(state, action, 'pictures')

      /**  <----------------addCertificateIdToProduct --------------  **/
    case types.COMMON.ADD_HASH_TAG_ID_TO_PRODUCT:
      return setRelatedObjIdForListItem.success(state, action, 'hashTags')

      /**  <----------------get product by identity --------------  **/
    case types.SUCCESS.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY:
      return slices.getProductsByIdentity.success(state, action)

      /** -------------------------- update product -------------------------> **/
    case types.COMMON.PRODUCT.UPDATE_PRODUCT:
      return slices.updateProduct.base(state, action)
    case types.SUCCESS.COMMON.PRODUCT.UPDATE_PRODUCT:
      return slices.updateProduct.success(state, action)
    case types.ERRORS.COMMON.PRODUCT.UPDATE_PRODUCT:
      return slices.updateProduct.error(state, action)

      /** -------------------------- delete product -------------------------> **/
    case types.COMMON.PRODUCT.DELETE_PRODUCT:
      return slices.deleteProduct.base(state, action)
    case types.SUCCESS.COMMON.PRODUCT.DELETE_PRODUCT:
      return slices.deleteProduct.success(state, action)
    case types.ERRORS.COMMON.PRODUCT.DELETE_PRODUCT:
      return slices.deleteProduct.error(state, action)
      /** -------------------------- reset -------------------------> **/
    case types.SUCCESS.COMMON.GET_BADGES:
      return setRelatedObjectsForAnObj.success(state, action, 'badges')
    case types.SUCCESS.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID:
      return setRelatedObjectsForAnObj.success(state, action, 'pictures')
    case types.SUCCESS.COMMON.GET_PRICE_BY_PRODUCT_ID:
      return setRelatedObjectsForAnObj.success(state, action, 'prices')
    case types.SUCCESS.COMMON.GET_OBJ_HASH_TAGS:
      return setRelatedObjectsForAnObj.success(state, action, 'hashTags')
    case types.RESET:
      return initialState.common.product.products
    default:
      return state
  }
}

export default products