import types from '../../../actions/types'
import initialState from '../../initialState'

const price = (state = initialState.common.product.price, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.PRODUCT.GET_PRODUCT_PRICE: {
      const {productId, data} = action.payload
      return {
        ...state,
        list: {...state.list, [productId]: [...data]},
      }
    }
    case types.SUCCESS.COMMON.PRODUCT.ADD_PRODUCT_PRICE: {
      const {productId, data} = action.payload
      return {
        ...state,
        list: {...state.list, [productId]: [...state.list[productId], {...data}]},
      }
    }
    case types.RESET:
      return initialState.common.product.price
    default:
      return state
  }
}

export default price