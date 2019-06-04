import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'


export function* getOrganizationsFilterByOfficialName(action) {
  const {payload} = action
  const {officialName} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORGANIZATION_FILTER_BY_OFFICIAL_NAME + officialName)
  try {
    yield fork(api.get, urls.ORG.GET_ORGANIZATION, results.ORG.GET_ORGANIZATION_FILTER_BY_OFFICIAL_NAME + officialName, `?official_name=${officialName.normalize()}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_ORGANIZATION_FILTER_BY_OFFICIAL_NAME, payload: {data}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_ORGANIZATION_FILTER_BY_OFFICIAL_NAME, payload: {message}})
  } finally {
    socketChannel.close()
  }
}