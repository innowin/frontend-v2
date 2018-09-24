import api from "src/consts/api"
import results from "src/consts/resultName"
import urls from "src/consts/URLS"
import {take, fork, call} from "redux-saga/effects"


export function* usernameCheck(action) {
  const {payload} = action
  const {username, resolve, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.USERNAME_CHECK)
  try {
    yield fork(api.post, urls.USER.USERNAME_CHECK, results.USER.USERNAME_CHECK, {username})
    const res = yield take(socketChannel)
    resolve(res)
  } catch (e) {
    const message = e.message
    reject(message)
  } finally {
    socketChannel.close()
  }
}