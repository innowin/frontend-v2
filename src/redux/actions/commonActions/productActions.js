import types from "../types/index"

export const getAllProductInfo = (limit, offset, search) => ({
  type: types.COMMON.GET_ALL_PRODUCTS,
  payload: {limit, offset, search},
})

export const getProductInfo = (id) => ({
  type: types.COMMON.GET_PRODUCT_INFO,
  payload: {id},
})

export const createProductAsContribution = (formData, resolve, reject) => ({
  type: types.COMMON.CREATE_PRODUCT,
  payload: {formData, resolve, reject},
})

const getProductsByIdentity = ({productOwnerId}) => ({
  type: types.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY,
  payload: {productOwnerId},
})

const deleteProduct = ({productId, productOwnerId}) => ({
  type: types.COMMON.PRODUCT.DELETE_PRODUCT,
  payload: {productId, productOwnerId},
})

const updateProduct = ({formValues, productId}) => ({
  type: types.COMMON.PRODUCT.UPDATE_PRODUCT,
  payload: {formValues, productId},
})

const getProductPrice = (productId) => ({
  type: types.COMMON.PRODUCT.GET_PRODUCT_PRICE,
  payload: {productId},
})

const addProductPrice = (productId, price) => ({
  type: types.COMMON.PRODUCT.ADD_PRODUCT_PRICE,
  payload: {productId, price},
})

const ProductActions = {
  getAllProductInfo,
  getProductsByIdentity,
  updateProduct,
  deleteProduct,
  getProductInfo,
  getProductPrice,
  addProductPrice,
  createProductAsContribution,
}

export default ProductActions