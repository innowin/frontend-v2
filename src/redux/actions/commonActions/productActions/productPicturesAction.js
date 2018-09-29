import types from '../../types'


export const getProductPicturesByProductId = (productId) => ({
  type: types.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID,
  payload: {productId}
})