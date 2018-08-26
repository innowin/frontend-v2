import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updatePost(action) {
  const {formValues, postId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.UPDATE_POST)
  try {
    yield fork(api.patch, urls.COMMON.POST.UPDATE_POST, results.COMMON.POST.UPDATE_POST, formValues, `${postId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.UPDATE_POST , payload:{data, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.UPDATE_POST,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}