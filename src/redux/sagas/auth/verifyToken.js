import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

// verify token
export function* verifyToken(action) {
  const {payload} = action
  const {token} = payload
  const socketChannel = yield call(api.createSocketChannel, results.VERIFY_TOKEN)
  try {
    yield fork(api.post, urls.VERIFY_TOKEN, results.VERIFY_TOKEN, {token})
    yield take(socketChannel)
  } catch (e) {
    const {message} = e
    if(message === "Error decoding signature."){
      yield put({type:types.AUTH.SIGN_OUT, payload:{}})
    }
  } finally {
    socketChannel.close()
  }
}