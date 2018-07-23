import types from './types'

export const getProductInfo = (id) => ({
    type: types.COMMON.GET_PRODUCT_INFO,
    id
})