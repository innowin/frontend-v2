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
    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data[i].product_owner}, userId: data[i].product_owner.id}})
      data[i].product_owner = data[i].product_owner.id
    }
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