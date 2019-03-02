import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call, select} from "redux-saga/effects"
import constants from 'src/consts/constants'
import uuid from "uuid"

// update user by user id
export function* updateProfileByProfileId(action) {
  const {payload} = action
  const {formValues, profileId, userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.UPDATE_PROFILE_BY_PROFILE_ID)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.patch, urls.USER.UPDATE_PROFILE_BY_PROFILE_ID, results.USER.UPDATE_PROFILE_BY_PROFILE_ID, formValues, `${profileId}`)
    const data = yield take(socketChannel)
    yield put({type:types.SUCCESS.USER.UPDATE_PROFILE_BY_PROFILE_ID, payload:{data, userId}})
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Update Profile Done']
          }
        }
      }
    })
    // yield put({type: types.USER.GET_PROFILE_BY_USER_ID, payload:{userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.USER.UPDATE_PROFILE_BY_PROFILE_ID, payload:{message}})
  } finally {
    socketChannel.close()
  }
}