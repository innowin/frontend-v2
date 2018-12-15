import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"


export function* resetPasswordBySmsRequest(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.PASSWORD_RESET_BY_SMS_REQUEST)
  try {
    const _data = {user_id: userId}
    yield fork(api.post, urls.USER.PASSWORD_RESET_BY_SMS_REQUEST, results.USER.PASSWORD_RESET_BY_SMS_REQUEST, _data, '', true)
    const data = yield take(socketChannel)
    if(data.status === "SUCCESS") {
      const userId = data.user_id
      yield put({type: types.SUCCESS.USER.PASSWORD_RESET_BY_SMS_REQUEST, payload: {userId}})
    } else {
      throw new Error(data.status)
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.PASSWORD_RESET_BY_SMS_REQUEST, payload: {message}})
  } finally {
    socketChannel.close()
  }
}

export function* resetPasswordBySmsCheckCode(action) {
  const {payload} = action
  const {userId, VerificationCode} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE)
  try {
    const _data = {user_id: userId, code: VerificationCode}
    yield fork(api.post, urls.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE, results.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE, _data, '', true)
    const data = yield take(socketChannel)
    if (data.status === "OK"){
      yield put({type: types.SUCCESS.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE, payload: {userId, VerificationCode}})
    } else {
      throw new Error(data.status)
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE, payload: {message, userId}})
  } finally {
    socketChannel.close()
  }
}

export function* resetPasswordBySms(action) {
  const {payload} = action
  const {userId, VerificationCode, password, passwordConfirm} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.PASSWORD_RESET_BY_SMS)
  try {
    const _data = {user_id: userId, code: VerificationCode, password, confirm_password: passwordConfirm}
    yield fork(api.post, urls.USER.PASSWORD_RESET_BY_SMS, results.USER.PASSWORD_RESET_BY_SMS, _data, '', true)
    const data = yield take(socketChannel)
    if (data.status === "SUCCESS"){
      yield put({
        type: types.SUCCESS.USER.PASSWORD_RESET_BY_SMS,
        payload: {data, userId}
      })
    } else {
      throw new Error(data.status)
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.PASSWORD_RESET_BY_SMS, payload: {message, userId}})
  } finally {
    socketChannel.close()
  }
}