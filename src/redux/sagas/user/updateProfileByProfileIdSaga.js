import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

// update user by user id
export function* updateProfileByProfileId(action) {
  const {payload} = action
  const {formValues, profileId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.UPDATE_PROFILE_BY_PROFILE_ID)
  try {
    yield fork(api.patch, urls.USER.UPDATE_PROFILE_BY_PROFILE_ID, results.USER.UPDATE_PROFILE_BY_PROFILE_ID, formValues, `${profileId}`)
    const data = yield take(socketChannel)
    const userId = data.profile_user
    yield put({type:types.SUCCESS.USER.UPDATE_PROFILE_BY_PROFILE_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.USER.UPDATE_PROFILE_BY_PROFILE_ID, payload:{message}})
  } finally {
    socketChannel.close()
  }
}