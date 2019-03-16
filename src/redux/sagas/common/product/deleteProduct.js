import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteProduct(action) {
  const {productId, productOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.PRODUCT.DELETE_PRODUCT)
  try {
    yield fork(api.del, urls.COMMON.PRODUCT, results.COMMON.PRODUCT.DELETE_PRODUCT, '', `${productId}`)
    yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.PRODUCT.DELETE_PRODUCT ,
      payload:{productId, productOwnerId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.PRODUCT.DELETE_PRODUCT,
      payload: {message, productId}
    })
  } finally {
    socketChannel.close()
  }
}