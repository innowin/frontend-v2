import {call, fork, put, take} from "redux-saga/effects";
import api from "src/consts/api";
import results from "src/consts/resultName";
import urls from "src/consts/URLS";
import types from "../../actions/types";
import constants from "../../../consts/constants";

export function* resetPasswordByEmailRequest(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.PASSWORD_RECOVERY_BY_EMAIL)
  try {
    const _data = {user_id: userId}
    yield fork(api.post, urls.USER.PASSWORD_RECOVERY_BY_EMAIL, results.USER.PASSWORD_RECOVERY_BY_EMAIL, _data, '', true)
    const data = yield take(socketChannel)
    if (data.detail === constants.SUCCESS_MESSAGES.CODE_SENDED) {
      yield put({type: types.SUCCESS.USER.PASSWORD_RECOVERY_BY_EMAIL,
        payload: {userId, data}})
    } else {
      throw new Error(data.detail)
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.PASSWORD_RECOVERY_BY_EMAIL, payload: {message}})
  } finally {
    socketChannel.close()
  }
}