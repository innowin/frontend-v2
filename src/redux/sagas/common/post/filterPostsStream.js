import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* filterPostsStream(action) {
  const {limit = 100, offset = 0} = action.payload
  let filter = `?`
  if (offset) {
    filter = filter + `&offset=${offset}`
  }
  if (limit) {
    filter += `&limit=${limit}`
  }
  const resultName = `${results.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET}-${Math.random()}`
  const socketChannel = yield call(api.createSocketChannel, resultName)
  try {
    yield fork(
        api.get,
        urls.COMMON.POST_STREAM,
        resultName,
        filter,
    )
    const data = yield take(socketChannel)
    let tempUsersId = []
    for (let i = 0; i < data.length; i++) {
      if (!tempUsersId.includes(data[i].post_related_identity.id)) {
        tempUsersId.push(data[i].post_related_identity.id)
        yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data[i].post_related_identity}, userId: data[i].post_related_identity.id}})
      }
      if (data[i].post_related_product) {
        yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, payload: {data: data[i].post_related_product}})
        yield put({type: types.USER.GET_USER_BY_USER_ID, payload: {userId: data[i].post_related_product.product_owner}})
        data[i].post_related_product = data[i].post_related_product.id
      }
      data[i].post_related_identity = data[i].post_related_identity.id
    }
    yield put({type: types.SUCCESS.COMMON.POST.FILTER_POSTS_STREAM, payload: {data}})
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}