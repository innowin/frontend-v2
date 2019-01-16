import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getUniversities(action) {
  yield put({type: types.SUCCESS.COMMON.GET_UNIVERSITIES, payload: {data: [], isLoading: true}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_UNIVERSITIES)
  try {
    yield fork(
        api.get,
        urls.COMMON.UNIVERSITY,
        results.COMMON.GET_UNIVERSITIES,
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.GET_UNIVERSITIES, payload: {data, isLoading: false}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.GET_UNIVERSITIES,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}