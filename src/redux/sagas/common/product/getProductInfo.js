import {call, fork, put, take} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'
import urls from 'src/consts/URLS'
import types from '../../../actions/types'

function* getProductInfo(action) {
  const {id, getLocations} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PRODUCT_BASIC_INFO + id)
  try {
    yield fork(api.get, urls.COMMON.PRODUCT, results.COMMON.GET_PRODUCT_BASIC_INFO + id, id, true)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data.product_owner}, userId: data.product_owner.id}})
    yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, payload: {data: {...data, product_owner: data.product_owner.id}}})
    if (getLocations) {
      if (data.product_related_country) yield put({type: types.COMMON.GET_COUNTRY, payload: {id: data.product_related_country}})
      if (data.product_related_province) yield put({type: types.COMMON.GET_PROVINCE, payload: {id: data.product_related_province}})
      if (data.product_related_town) yield put({type: types.COMMON.GET_CITY, payload: {id: data.product_related_town}})
    }
  }
  catch (error) {
    yield put({type: types.ERRORS.COMMON.GET_PRODUCT_INFO, payload: {error, id}})
  }
  finally {
    socketChannel.close()
  }
}

export default getProductInfo
