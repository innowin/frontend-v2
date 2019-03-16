import types from '../../types/index'

export const getAllProductInfo = (limit, offset, search) => ({
  type: types.COMMON.GET_ALL_PRODUCTS,
  payload: {limit, offset, search}
})

export const getProductInfo = (id) => ({
  type: types.COMMON.GET_PRODUCT_INFO,
  payload: {
    id
  }
})

export const createProductAsContribution = (formData) => ({
  type: types.COMMON.CREATE_PRODUCT,
  payload: {
    formData
  }
})

const getProductsByIdentity = ({identityId, productOwnerId}) => ({
  type: types.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY,
  payload: {identityId, productOwnerId}
})

const deleteProduct = ({productId, productOwnerId}) => ({
  type: types.COMMON.PRODUCT.DELETE_PRODUCT,
  payload: {productId, productOwnerId}
})

const updateProduct = ({formValues, productId}) => ({
  type: types.COMMON.PRODUCT.UPDATE_PRODUCT,
  payload: {formValues, productId}
})

const ProductActions = {
  getAllProductInfo,
  getProductsByIdentity,
  updateProduct,
  deleteProduct,
  getProductInfo
}

export default ProductActions