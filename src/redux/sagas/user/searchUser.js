import {call, fork, put, take} from "redux-saga/effects";
import api from "../../../consts/api";
import results from "../../../consts/resultName";
import urls from "../../../consts/URLS";
import types from "../../actions/types";

export function* searchUser(action) {
  const {payload} = action
  const {input} = payload
  const dataToServer = {input}
  const socketChannel = yield call(api.createSocketChannel, results.USER.SEARCH_USER)
  try {
    yield fork(api.get, urls.USER.SEARCH_USER, results.USER.SEARCH_USER, '', dataToServer, true)
    const data = yield take(socketChannel)
    if(data.status) {
      yield put({type: types.ERRORS.USER.SEARCH_USER, payload: {message: data.status}})
    }
    else {
      yield put({
        type: types.SUCCESS.USER.SEARCH_USER,
        payload: {data}
      })
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.SEARCH_USER, payload: {message}})
  } finally {
    socketChannel.close()
  }
}