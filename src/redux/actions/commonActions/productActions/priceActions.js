import types from "../../types"

export const getPriceByProductId = (productId) => ({
  type: types.COMMON.GET_PRICE_BY_PRODUCT_ID,
  payload: {
    productId
  }
})