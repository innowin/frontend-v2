import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updatePost(action) {
  const {formValues, postId, postOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.UPDATE_POST)
  try {
    yield fork(api.patch, urls.COMMON.POST, results.COMMON.POST.UPDATE_POST, formValues, `${postId}`)
    const data = yield take(socketChannel)
    //TODO: change this at later and no need to get
    const postIdentity = data.post_identity
    yield put({type: types.SUCCESS.COMMON.POST.UPDATE_POST , payload:{data, postId, postOwnerId}})
    yield put({type: types.COMMON.POST.GET_POST_BY_IDENTITY , payload:{postIdentity, postOwnerId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.UPDATE_POST,
      payload: {message, postId}
    })
  } finally {
    socketChannel.close()
  }
}