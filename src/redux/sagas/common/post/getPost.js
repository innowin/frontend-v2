import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getPost(action) {
  const {postId, postOwnerType, postOwnerId,} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.GET_POST)
  try {
    yield fork(api.get, urls.COMMON.POST, results.COMMON.POST.GET_POST, `${postId}`)
    const data = yield take(socketChannel)
    // yield put({type: types.COMMON.POST.GET_POST_VIEWER_COUNT, payload: {postId: data.id}})
    if (data.post_related_identity_image) {
      yield put({type: types.COMMON.GET_FILE, payload: {fileId: data.post_related_identity_image}})
    }
    if (data.post_parent) {
      yield put({type: types.COMMON.GET_FILE, payload: {fileId: data.post_picture}})
    }
    if(data.post_related_product) {
      yield put({type: types.COMMON.GET_PRODUCT_INFO, payload: {id: data.post_related_product}})
    }
    yield put({type: types.SUCCESS.COMMON.POST.GET_POST, payload: {data, postOwnerId, postOwnerType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.GET_POST,
      payload: {message, postId}
    })
  } finally {
    socketChannel.close()
  }
}