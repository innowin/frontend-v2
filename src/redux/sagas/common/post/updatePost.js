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
    //TODO: change this at later and no need to get
    const data = yield take(socketChannel)
    const postIdentity = data.post_identity
    yield put({type: types.SUCCESS.COMMON.POST.UPDATE_POST , payload:{data, userId}})
    yield put({type: types.COMMON.POST.GET_POST_BY_IDENTITY , payload:{postIdentity, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.UPDATE_POST,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}