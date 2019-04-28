import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {take, put, fork, call} from 'redux-saga/effects'

export function* getProductsByIdentity(action) {
  const {productOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY)
  try {
    yield fork(api.get, urls.COMMON.PRODUCT, results.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY, `?product_owner=${productOwnerId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY, payload: {data, productOwnerId}})
  }
  catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}