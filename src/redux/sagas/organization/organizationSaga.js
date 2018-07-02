import types from 'src/redux/actions/actionTypes'
import urls from 'src/consts/URLS'
import {put,take, fork,takeEvery, apply,call} from 'redux-saga/effects'
import api from 'src/consts/api'
import client from 'src/consts/client'
import data from 'src/consts/data'
import results from 'src/consts/resultName'

/**********    %% WORKERS %%    **********/

//1 - req -sending requests
function* sendRequest(organId) {
	yield apply({}, api.query, [urls.GET_ORGANIZATION, results.GET_ORGANIZATION,{organId}])
}
//1 - get org worker
export function* getOrganization (payload) {
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORGANIZATION)
	try {
    yield fork(sendRequest , organizationId )
    yield put({ type: types.SUCCESS.GET_ORGANIZATION, payload:{data} })

	} catch (e) {
		const {message} = e
		yield put({type:types.ERROR.GET_ORGANIZATION, payload:{type:types.ERRORS.GET_ORGANIZATION,message}})
	} finally {
		socketChannel.close()
	}
}

//2 - get org success
function getOrganizationSuccess(action) {
	const {organizationId} = action.payload
	data.setID(organizationId)
}

/**********    %% WATCHERS %%    **********/
//1 - get organization
export function* watchGetOrganization() {
	yield takeEvery(types.GET_ORGANIZATION, getOrganization)
}

//2 - get organization - success
export function* watchGetOrganizationSuccess() {
	yield takeEvery(types.SUCCESS.GET_ORGANIZATION, getOrganizationSuccess)
}
