import types from "../../../actions/types"
import initialState from "../../initialState"
import appendListToStateList from "../../sliceReducers/utilsSlices/appendListToStateList"


const price = (state = initialState.common.product.price, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.GET_PRICE_BY_PRODUCT_ID:
      return appendListToStateList.success(state, action)
    case types.RESET:
      return initialState.common.product.price
    default:
      return state
  }
}

export default price