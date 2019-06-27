import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getPostByIdentity(action) {
  const {postIdentity, postOwnerId, limit = 100, offset = 0} = action.payload
  let filter = `?post_related_identity=${postIdentity}`
  if (offset) {
    filter = filter + `&offset=${offset}`
  }
  if (limit) {
    filter += `&limit=${limit}`
  }
  const result = results.COMMON.POST.GET_POST_BY_IDENTITY + postIdentity + Math.random()
  const socketChannel = yield call(api.createSocketChannel, result)
  try {
    yield fork(api.get, urls.COMMON.POST, result, filter)
    const data = yield take(socketChannel)
    let tempUsersId = []
    for (let i = 0; i < data.length; i++) {
      if (!tempUsersId.includes(data[i].post_related_identity.id)) {
        tempUsersId.push(data[i].post_related_identity.id)
        yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data[i].post_related_identity}, userId: data[i].post_related_identity.id}})
      }
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