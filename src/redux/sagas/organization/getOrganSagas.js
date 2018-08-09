import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, takeEvery, call} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'

/**********    %% WORKERS %%    **********/

//1 - get organization by organId worker
export function* getOrganization(action) {
  const payload = action.payload
  const {organizationId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORGANIZATION)
  try {
    yield fork(api.get, urls.ORG.GET_ORGANIZATION, results.ORG.GET_ORGANIZATION, organizationId)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_ORGANIZATION, payload: {data, organizationId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_ORGANIZATION, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}

/**********    %% WATCHERS %%    **********/
//1 -  get organization by organId
export function* watchGetOrganization() {
  yield takeEvery(types.ORG.GET_ORGANIZATION, getOrganization)
}
