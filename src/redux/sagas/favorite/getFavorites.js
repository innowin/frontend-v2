import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

export function* getFavorites() {
  const socketChannel = yield call(api.createSocketChannel, results.FAVORITE.GET_FAVORITES)
  try {
    yield fork(api.get, urls.FAVORITE, results.FAVORITE.GET_FAVORITES, ``)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.FAVORITE.GET_FAVORITES, payload: {data}})
    for (let favorite of data) {
      yield put({type: types.COMMON.FILE.GET_FILE, payload: {fileId: favorite.favorite_related_media}})
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.FAVORITE.GET_FAVORITES, payload: {message}})
  } finally {
    socketChannel.close()
  }
}