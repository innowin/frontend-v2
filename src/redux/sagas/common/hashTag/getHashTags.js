import api from 'src/consts/api'
import results from 'src/consts/resultName'
import urls from 'src/consts/URLS'
import {call, put, fork, take} from 'redux-saga/effects'
import helpers from 'src/consts/helperFunctions/helperFunctions'
import types from '../../../actions/types'

function* getHashTags(action) {
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_HASH_TAGS)
  const {identity_type} = action.payload
  let filter = ''
  if (identity_type) filter = `?type=${identity_type}`
  try {
    yield fork(api.get, urls.COMMON.HASH_TAG, results.COMMON.GET_HASH_TAGS, filter, true)
    const data = yield take(socketChannel)
    const normalData = helpers.arrayToIdKeyedObject(data)
    yield put({type: types.SUCCESS.COMMON.GET_HASH_TAGS, payload: {data: normalData}})
  }
  catch (error) {
    yield put({type: types.ERRORS.COMMON.GET_HASH_TAGS, error})
  }
  finally {
    socketChannel.close()
  }
}

export default getHashTags