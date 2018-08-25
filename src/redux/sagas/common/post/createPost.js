import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createPost(action) {
  const {formValues} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.CREATE_POST)
  try {
    yield fork(api.post, urls.COMMON.POST.CREATE_POST, results.COMMON.POST.CREATE_POST, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.CREATE_POST , payload:{data}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.CREATE_POST,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}