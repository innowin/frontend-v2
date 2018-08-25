import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getPostByIdentity(action) {
  const {postIdentity} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.GET_POST_BY_IDENTITY)
  try {
    yield fork(api.get, urls.COMMON.POST.GET_POST_BY_IDENTITY, results.COMMON.POST.GET_POST_BY_IDENTITY, `?post_identity_id=${postIdentity}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.GET_POST_BY_IDENTITY , payload:{data, postIdentity}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.GET_POST_BY_IDENTITY,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}