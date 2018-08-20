import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

// update user by user id
export function* updateUserByUserId(action) {
  const {payload} = action
  const {formValues, userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.UPDATE_USER_BY_USER_ID)
  try {
    yield fork(api.patch, urls.USER.UPDATE_USER_BY_USER_ID, results.USER.UPDATE_USER_BY_USER_ID, formValues, `${userId}`)
    const {data} = yield take(socketChannel)
    yield put({type:types.SUCCESS.USER.UPDATE_USER_BY_USER_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.USER.UPDATE_USER_BY_USER_ID, payload:{message}})
  } finally {
    socketChannel.close()
  }
}