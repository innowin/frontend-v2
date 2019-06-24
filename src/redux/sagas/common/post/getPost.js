import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getPost(action) {
  const {postId, postOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.GET_POST)
  try {
    yield fork(api.get, urls.COMMON.POST, results.COMMON.POST.GET_POST, `${postId}`)
    const data = yield take(socketChannel)
    if (data.post_related_product) {
      yield put({type: types.COMMON.GET_PRODUCT_INFO, payload: {id: data.post_related_product}})
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