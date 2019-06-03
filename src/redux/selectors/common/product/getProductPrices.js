import {createSelector} from 'reselect'

const getProductPrice = (state, productId) => {
  return state.common.product.price.list[productId]
}

// a small selector for work with hashTags.
export const priceListSelector = createSelector(
    getProductPrice,
    price => price,
)