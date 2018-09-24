import types from '../types/index'

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

const getProductsByIdentity = ({identityId, productOwnerId, productOwnerType}) => ({
  type: types.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY,
  payload: {identityId, productOwnerId, productOwnerType}
})

const deleteProduct = ({productId, productOwnerId, productOwnerType}) => ({
  type: types.COMMON.PRODUCT.DELETE_PRODUCT,
  payload: {productId, productOwnerId, productOwnerType}
})

const updateProduct = ({formValues, productId}) => ({
  type: types.COMMON.PRODUCT.UPDATE_PRODUCT,
  payload: {formValues, productId}
})

const ProductActions = {
  getProductsByIdentity,
  updateProduct,
  deleteProduct,
}

export default ProductActions