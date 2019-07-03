import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getPost(action) {
  const {postId, postOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.GET_POST)
  try {
    yield fork(api.get, urls.COMMON.POST, results.COMMON.POST.GET_POST, `${postId}`, true)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: data.post_related_identity}, userId: data.post_related_identity.id})
    data.post_related_identity = data.post_related_identity.id
    if (data.post_related_product) {
      yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, payload: {data: data.post_related_product}})
      data.post_related_product = data.post_related_product.id
    }
    yield put({type: types.SUCCESS.COMMON.POST.GET_POST, payload: {data, postOwnerId}})
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.GET_POST,
      payload: {message, postId},
    })
  }
  finally {
    socketChannel.close()
  }
}