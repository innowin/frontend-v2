import api from "src/consts/api"
import results from "src/consts/resultName"
import urls from "src/consts/URLS"
import {take, fork, call} from "redux-saga/effects"


export function* emailCheck(action) {
  const {payload} = action
  const {email, resolve, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.EMAIL_CHECK)
  try {
    yield fork(api.post, urls.USER.EMAIL_CHECK, results.USER.EMAIL_CHECK, {email})
    const res = yield take(socketChannel)
    resolve(res)
  } catch (e) {
    const message = e.message
    reject(message)
  } finally {
    socketChannel.close()
  }
}
