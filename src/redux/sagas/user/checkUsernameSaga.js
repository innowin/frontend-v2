import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, fork, call, takeLatest} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

function* usernameCheck(action) {
  const {payload} = action
  const {username, resolve, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.USERNAME_CHECK)
  try {
    yield fork(api.post, urls.USER.USERNAME_CHECK, results.USER.USERNAME_CHECK, {username})
    const res = yield take(socketChannel)
    resolve(res)
  } catch (e) {
    const {message} = e
    reject(message)
  } finally {
    socketChannel.close()
  }
}

/**********    %% WATCHERS %%    **********/

export default function* watchUsernameCheck() {
  yield takeLatest(types.USER.USERNAME_CHECK, usernameCheck)
}