import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'


export function* filterPostByPostRelatedProduct(action) {
  const {postRelatedProductId, postType, limit = 100, offset = 0, postParentType} = action.payload
  let filter = `?`
  if (postRelatedProductId) {
    filter += `post_related_product=${postRelatedProductId}`
  }
  if (limit) {
    filter += `&limit=${limit}`
  }
  if (offset) {
    filter = filter + `&offset=${offset}`
  }
  if (postType) {
    filter = filter + `&post_type=${postType}`
  }
  const resultName = `${results.COMMON.POST.FILTER_POSTS_BY_POST_RELATED_PRODUCT}-${postRelatedProductId}`
  const socketChannel = yield call(api.createSocketChannel, resultName)
  try {
    yield fork(
        api.get,
        urls.COMMON.POST,
        resultName,
        filter,
    )
    const data = yield take(socketChannel)
    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: {...data[i].post_related_identity}, userId: data[i].post_related_identity.id}})
      data[i].post_related_identity = data[i].post_related_identity.id
    }
    yield put({
      type: types.SUCCESS.COMMON.POST.FILTER_POSTS_BY_POST_RELATED_PRODUCT,
      payload: {data, postRelatedProductId, postParentType},
    })
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.COMMON.POST.FILTER_POSTS_BY_POST_RELATED_PRODUCT,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}