import types from 'src/redux/actions/actionTypes'
import urls from 'src/consts/URLS'
import {put,take, fork,takeEvery, apply,call} from 'redux-saga/effects'
import api from 'src/consts/api'
import client from 'src/consts/client'
import results from 'src/consts/resultName'

/**********    %% WORKERS %%    **********/
//1 - req -sending requests
function* sendRequest(request, result, param) {
	yield apply({}, api.get, [request, result,param])
}
function* postRequest(request, result,data, param) {
	yield apply({}, api.post, [request, result,data,param])
}
function* updateRequest(request, result, data, param) {
	yield apply({}, api.patch, [request, result,data,param])
}
//1 - get org worker
export function* getOrganization (action) {
	const payload = action.payload
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORGANIZATION)
	try {
		yield fork(sendRequest ,urls.GET_ORGANIZATION, results.GET_ORGANIZATION ,organizationId )
		// while (true) {
		const data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.GET_ORGANIZATION, payload:data })
		// }
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORGANIZATION, payload:{type:types.ERRORS.GET_ORGANIZATION,message}})
	} finally {
		socketChannel.close()
	}
}

//2 - get org success
function getOrganizationSuccess(action) {
	const {organizationId} = action.payload
}

//3 - get organization members
function* getOrganizationMembers(action){
	const payload = action.payload
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORGANIZATION_MEMBERS)
	try {
		yield fork(sendRequest ,urls.GET_ORGANIZATION_MEMBERS, results.GET_ORGANIZATION_MEMBERS ,`?staff_organization=${organizationId}` )
		while (true) {
			const data = yield take(socketChannel)
			yield put({ type: types.SUCCESS.GET_ORGANIZATION_MEMBERS, payload:data })
		}
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORGANIZATION_MEMBERS, payload:{type:types.ERRORS.GET_ORGANIZATION_MEMBERS,message}})
	} finally {
		socketChannel.close()
	}	
}

//5 - update - organization
function* updateOrganization(action){
	const payload = action.payload
	const {organizationId, formValues} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.UPDATE_ORGANIZATION_INFO)
	try {
		yield fork(updateRequest ,urls.UPDATE_ORGANIZATION_INFO, results.UPDATE_ORGANIZATION_INFO ,formValues, organizationId )
		while (true) {
			const data = yield take(socketChannel)
			yield put({ type: types.SUCCESS.UPDATE_ORGANIZATION_INFO, payload:data })
		}
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.UPDATE_ORGANIZATION_INFO, payload:{type:types.ERRORS.UPDATE_ORGANIZATION_INFO,message}})
	} finally {
		socketChannel.close()
	}
}

//6 - get - products
function* getProducts(action){
	const payload = action.payload
	const {IDENTITY_ID} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.GET_PRODUCTS)
	try {
		yield fork(sendRequest ,urls.GET_PRODUCTS, results.GET_PRODUCTS , `?product_owner=${IDENTITY_ID}` )
		while (true) {
			const data = yield take(socketChannel)
			yield put({ type: types.SUCCESS.GET_PRODUCTS, payload:data })
		}
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_PRODUCTS, payload:{type:types.ERRORS.GET_PRODUCTS,message}})
	} finally {
		socketChannel.close()
	}
}

// 7 - get - followers
function* getFollowers(action){
	const payload = action.payload
	const {organizationId} = payload;
	const identity = yield* getOrgIdentity(action)
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORG_FOLLOWERS)
	try {
		yield fork(sendRequest ,urls.GET_ORG_FOLLOWERS, results.GET_ORG_FOLLOWERS , `?follow_followed=${identity[0]}` )
		const data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.GET_ORG_FOLLOWERS, payload:data })
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORG_FOLLOWERS, payload:{type:types.ERRORS.GET_ORG_FOLLOWERS,message}})
	} finally {
		socketChannel.close()
	}
}

// 8 - get - followings
function* getFollowings(action){

}

// 9 - get - exchanges
function* getExchanges(action){

}

//10 get - org - identity
function* getOrgIdentity(action){
	const payload = action.payload
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.GET_USER_IDENTITY)
	let res
	try {
		yield fork(sendRequest ,urls.GET_USER_IDENTITY, results.GET_USER_IDENTITY , `?identity_organization=${organizationId}` )
		const data = yield take(socketChannel)
		res = data
		yield put({ type: types.SUCCESS.GET_USER_IDENTITY, payload:data })
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_USER_IDENTITY, payload:{type:types.ERRORS.GET_USER_IDENTITY,message}})
	} finally {
		socketChannel.close()
		return res
	}
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

//3 - get organization - members
export function* watchGetOrganizationMembers() {
	yield takeEvery(types.GET_ORGANIZATION_MEMBERS, getOrganizationMembers)
}

//5 - update organization 
export function* watchUpdateOrganization() {
	yield takeEvery(types.UPDATE_ORGANIZATION_INFO, updateOrganization)
}

//6- get products
export function* watchGetProducts() {
	yield takeEvery(types.GET_PRODUCTS, getProducts)
}

//7- get org identity
export function* watchGetOrgIdentity() {
	yield takeEvery(types.GET_USER_IDENTITY, getOrgIdentity)
}

// 8 - get org followers
export function* watchGetOrgFollowers(){
	yield takeEvery(types.GET_ORG_FOLLOWERS, getFollowers)
}