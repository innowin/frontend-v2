import {call, fork, put, take} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'
import urls from 'src/consts/URLS'
import types from '../../../actions/types'
import {objNormalizer} from 'src/consts/helperFunctions/normalizer'
import constants from 'src/consts/constants'


function* getProductInfo(action) { // action = {type, id}
  const {id} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PRODUCT_BASIC_INFO + id)
  try {
    yield fork(api.get, urls.COMMON.PRODUCT, results.COMMON.GET_PRODUCT_BASIC_INFO + id, id)
    const data = yield take(socketChannel)
    const {entity, product_category, product_related_country, product_related_province, product_related_town /*,product_user*/} = objNormalizer(data)
    yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, payload: {data: entity}})
    yield put({type: types.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID, payload: {fileRelatedParentId: data.id, fileParentType: constants.FILE_PARENT.PRODUCT}})
    yield put({type: types.SUCCESS.COMMON.GET_CATEGORY, payload: {data: product_category}})
    yield put({type: types.SUCCESS.COMMON.GET_COUNTRY, payload: {data: product_related_country}})
    yield put({type: types.SUCCESS.COMMON.GET_PROVINCE, payload: {data: product_related_province}})
    yield put({type: types.SUCCESS.COMMON.GET_CITY, payload: {data: product_related_town}})
  }
  catch (error) {
    yield put({type: types.ERRORS.COMMON.GET_PRODUCT_INFO, error})
  }
  finally {
    socketChannel.close()
  }
}

export default getProductInfo