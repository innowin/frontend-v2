import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getProductPrice(action) {
  const {productId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PRICE_BY_PRODUCT_ID)
  try {
    yield fork(
        api.get,
        urls.COMMON.PRICE,
        results.COMMON.GET_PRICE_BY_PRODUCT_ID,
        `?product_id=${productId}`
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.PRODUCT.GET_PRODUCT_PRICE, payload: {data}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.PRODUCT.GET_PRODUCT_PRICE,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}