import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* addProductPrice(action) {
  const {productId, price} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.ADD_PRICE_BY_PRODUCT_ID)
  try {
    yield fork(
        api.post,
        urls.COMMON.PRICE,
        results.COMMON.ADD_PRICE_BY_PRODUCT_ID,
        {price_product: productId, value: price},
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.PRODUCT.ADD_PRODUCT_PRICE, payload: {productId, data}})
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.PRODUCT.ADD_PRODUCT_PRICE,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}