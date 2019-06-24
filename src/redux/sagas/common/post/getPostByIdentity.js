import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getPostByIdentity(action) {
  const {postIdentity, postOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.GET_POST_BY_IDENTITY + postIdentity)
  try {
    yield fork(api.get, urls.COMMON.POST, results.COMMON.POST.GET_POST_BY_IDENTITY + postIdentity, `?post_related_identity=${postIdentity}`)
    const data = yield take(socketChannel)
    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data[i].post_related_identity}, userId: data[i].post_related_identity.id}})
      data[i].post_related_identity = data[i].post_related_identity.id
    }
    yield put({type: types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY, payload: {data, postIdentity, postOwnerId}})
    for (let post of data) {
      if (post.post_related_product) {
        yield put({type: types.COMMON.GET_PRODUCT_INFO, payload: {id: post.post_related_product}})
      }
    }
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.GET_POST_BY_IDENTITY,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}