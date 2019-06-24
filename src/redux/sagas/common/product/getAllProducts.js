import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getAllProducts(action) {
  const {limit, offset, search} = action.payload
  const params = search !== null ? `?name=${search}` : `?limit=${limit}&offset=${offset}`
  yield put({type: types.SUCCESS.COMMON.GET_ALL_PRODUCTS, payload: {data: [], search, isLoading: true}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_ALL_PRODUCTS)
  try {
    yield fork(
        api.get,
        urls.COMMON.PRODUCT,
        results.COMMON.GET_ALL_PRODUCTS,
        params,
    )
    let data = yield take(socketChannel)
    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data[i].product_owner}, userId: data[i].product_owner.id}})
      data[i].product_owner = data[i].product_owner.id
    }
    yield put({type: types.SUCCESS.COMMON.GET_ALL_PRODUCTS, payload: {data, search, isLoading: false}})
    yield put({type: types.COMMON.GET_CATEGORIES})
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.GET_ALL_PRODUCTS,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}