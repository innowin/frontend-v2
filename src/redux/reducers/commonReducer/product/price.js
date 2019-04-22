import types from '../../../actions/types'
import initialState from '../../initialState'

const price = (state = initialState.common.product.price, action) => {
  switch (action.type) {
      // todo Hoseyn
    case types.SUCCESS.COMMON.PRODUCT.GET_PRODUCT_PRICE:
      console.log('here we go babies')
      return {...state, salam: {}}
    case types.RESET:
      return initialState.common.product.price
    default:
      return state
  }
}

export default price