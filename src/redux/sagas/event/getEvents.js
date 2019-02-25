import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getEvents () {
  const socketChannel = yield call(api.createSocketChannel, results.EVENTS.GET_EVENTS)
  try {
    yield fork(api.get, urls.EVENTS, results.EVENTS.GET_EVENTS)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EVENT.GET_EVENTS, payload: {data, isLoading: false}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERROR.EVENT.GET_EVENTS,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}