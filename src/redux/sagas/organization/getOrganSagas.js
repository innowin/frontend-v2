import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'


export function* getOrganizationByOrganId(action) {
  const payload = action.payload
  const {organizationId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORGANIZATION)
  try {
    yield fork(api.get, urls.ORG.GET_ORGANIZATION, results.ORG.GET_ORGANIZATION, organizationId)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_ORGANIZATION, payload: {data, organizationId}})
    const organLogoId = data.organization_logo
    const organBannerId = data.organization_banner
    if (organLogoId) {
      yield put({type:types.COMMON.GET_FILE, payload:{fileId:organLogoId}})
    }
    if (organBannerId && organLogoId !== organBannerId){
      yield put({type:types.COMMON.GET_FILE, payload:{fileId:organBannerId}})
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_ORGANIZATION, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}
