import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getEducationFields(action) {
  yield put({type: types.SUCCESS.COMMON.GET_EDUCATION_FIELDS, payload: {data: [], isLoading: true}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_EDUCATIONS_FIELDS)
  try {
    yield fork(
        api.get,
        urls.COMMON.EDUCATION_FIELDS,
        results.COMMON.GET_EDUCATIONS_FIELDS,
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.GET_EDUCATION_FIELDS, payload: {data, isLoading: false}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.GET_EDUCATION_FIELDS,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}