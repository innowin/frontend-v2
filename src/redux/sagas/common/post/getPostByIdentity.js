import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getPostByIdentity(action) {
  const {postIdentity, postOwnerId, postOwnerType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.GET_POST_BY_IDENTITY + postIdentity)
  try {
    yield fork(api.get, urls.COMMON.POST, results.COMMON.POST.GET_POST_BY_IDENTITY + postIdentity, `?post_related_identity=${postIdentity}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY, payload: {data, postIdentity, postOwnerId, postOwnerType}})
    for (let post of data) {
      if (post.post_related_product) {
        yield put({type: types.COMMON.GET_PRODUCT_INFO, payload: {id: post.post_related_product.id}})
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