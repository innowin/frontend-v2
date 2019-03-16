import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

export function* getResearchByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.RESEARCH.GET_USER_RESEARCH_BY_USER_ID)
  try {
    yield fork(api.get, urls.RESEARCH, results.RESEARCH.GET_USER_RESEARCH_BY_USER_ID, `?research_related_identity=${userId}`)
    const data = yield take(socketChannel)
    yield put({type:types.SUCCESS.RESEARCH.GET_USER_RESEARCH_BY_USER_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.RESEARCH.GET_USER_RESEARCH_BY_USER_ID, payload:{message, userId}})
  } finally {
    socketChannel.close()
  }
}