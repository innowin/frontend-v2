import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* updateProduct(action) {
  const {formValues, productId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.PRODUCT.UPDATE_PRODUCT)
  try {
    yield fork(api.patch, urls.COMMON.PRODUCT, results.COMMON.PRODUCT.UPDATE_PRODUCT, formValues, `${productId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.PRODUCT.UPDATE_PRODUCT, payload: {data, productId}})
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.PRODUCT.UPDATE_PRODUCT,
      payload: {message, productId},
    })
  }
  finally {
    socketChannel.close()
  }
}