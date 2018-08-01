import types from '../types/index'

export const getProductInfo = (id) => ({
    type: types.COMMON.GET_PRODUCT_INFO,
    id
})


export const updateProduct = (id, formData) => ({
    type: types.COMMON.UPDATE_PRODUCT,
    payload: {
        id,
        formData
    }
})