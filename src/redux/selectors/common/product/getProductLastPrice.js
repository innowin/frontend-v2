import {createSelector} from "reselect";
import helpers from "../../../../consts/helperFunctions/helperFunctions"


/**
 returns value of the last price or if exists else returns 'call' string.
 **/
const getProductLastPriceByProductId = (state, id, priceType) => {
  let value = 'تماس' // fixme: this is temporary. and should be change to 'call' after using of translator.
  if (priceType === 'specified') {
    const prices = helpers.filterNestedObjByKey(state.common.product.price.list, 'price_product', id)
    let lastPrice = Object.values(prices).slice(-1)
    lastPrice && (lastPrice = lastPrice[0])
    value = lastPrice ? lastPrice.value : 'تماس'
  }
  return value
}


/**
 selects the value of the last price of a specific product.
 **/
const makeProductLastPriceSelectorByProductId = () => createSelector(
    getProductLastPriceByProductId,
    product => product || {}
)

export default makeProductLastPriceSelectorByProductId