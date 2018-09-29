import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createPost(action) {

  const {formValues, postOwnerId, postOwnerType, postParentId, postParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.CREATE_POST)
  try {
    yield fork(api.post, urls.COMMON.POST, results.COMMON.POST.CREATE_POST, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.POST.CREATE_POST ,
      payload:{data, postOwnerId, postOwnerType, postParentId, postParentType}})
    const postIdentity = data.post_identity
    yield put({type: types.COMMON.POST.GET_POST_BY_IDENTITY , payload:{postIdentity, postOwnerId, postOwnerType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.CREATE_POST,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}