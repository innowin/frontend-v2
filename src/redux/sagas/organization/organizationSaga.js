import types from 'src/redux/actions/actionTypes'
import urls from 'src/consts/URLS'
import {put,take, fork,takeEvery, apply,call, all} from 'redux-saga/effects'
import api from 'src/consts/api'
import client from 'src/consts/client'
import results from 'src/consts/resultName'

function* createSimpleChannel(result, url, type, query= ''){
	const socketChannel = yield call(api.createSocketChannel, result)
	let data
	try {
		yield fork(sendRequest ,url, result , query )
		data = yield take(socketChannel)
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS[type], payload:{type:types.ERRORS[type],message}})
	} finally {
		socketChannel.close()
		return data
	}
}

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
	const {organizationId, formValues,hideEdit} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.UPDATE_ORGANIZATION_INFO)
	try {
		yield fork(updateRequest ,urls.UPDATE_ORGANIZATION_INFO, results.UPDATE_ORGANIZATION_INFO ,formValues, organizationId )
		const data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.UPDATE_ORGANIZATION_INFO, payload:data })

	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.UPDATE_ORGANIZATION_INFO, payload:{type:types.ERRORS.UPDATE_ORGANIZATION_INFO,message}})
	} finally {
		socketChannel.close()
		hideEdit()
	}
}

//6 - get - products
function* getProducts(action){
	const payload = action.payload
	const {organizationId} = payload;
	const identity = yield* getOrgIdentity(action)
	const socketChannel = yield call(api.createSocketChannel, results.GET_PRODUCTS)
	try {
		yield fork(sendRequest ,urls.GET_PRODUCTS, results.GET_PRODUCTS , `?product_owner=${identity}` )
		const data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.GET_PRODUCTS, payload:data })
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
	let followers = yield* getFollowersIdentities(identity[0].id)
	followers = followers.map((val,idx)=>{
		return getFollower(val.follow_follower)
	})
	const results = yield* all(followers)
}
// 8 - get - followings
function* getFollowings(action){
	const payload = action.payload
	const {organizationId} = payload;
	const identity = yield* getOrgIdentity(action)
	const followings = yield* getFollowingsIdentities(identity[0].id)
	followings.map((val,idx)=>{
		return getFollowing(val.follow_followed)
	})
	const results = yield* all(followings)
}
// 9 - get - exchanges
function* getExchanges(action){
	const payload = action.payload
	const {organizationId} = payload;
	const identity = yield getOrgIdentity(action)
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORG_EXCHANGES)
	try {
		yield fork(sendRequest ,urls.GET_ORG_EXCHANGES, results.GET_ORG_EXCHANGES , `?identity_id=${identity[0].id}` )
		const data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.GET_ORG_EXCHANGES, payload:data })
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORG_EXCHANGES, payload:{type:types.ERRORS.GET_ORG_EXCHANGES,message}})
	} finally {
		socketChannel.close()
	}
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
//11 get - org- followings identities
function* getFollowingsIdentities(orgIdentity){
	let data
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORG_FOLLOWINGS_IDENTITIES)
	try {
		yield fork(sendRequest ,urls.GET_ORG_FOLLOWERS, results.GET_ORG_FOLLOWINGS_IDENTITIES , `?follow_follower=${orgIdentity}` )
		data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.GET_ORG_FOLLOWINGS_IDENTITIES, payload:data })
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORG_FOLLOWINGS_IDENTITIES, payload:{type:types.ERRORS.GET_ORG_FOLLOWINGS_IDENTITIES,message}})
	} finally {
		socketChannel.close()
		return data
	}
}
//12 get following
function* getFollowing(follow_followed){
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORG_FOLLOWING)
	try {
		yield fork(sendRequest ,urls.GET_USER_IDENTITY, results.GET_ORG_FOLLOWING , `${follow_followed}` )
		const data = yield take(socketChannel)
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORG_FOLLOWING, payload:{type:types.ERRORS.GET_ORG_FOLLOWING,message}})
	} finally {
		socketChannel.close()
	}
}
//13 get - org - followers identities
function* getFollowersIdentities(orgIdentity){
	return yield createSimpleChannel('get-followers-identities','organizations/follows',types.GET_ORG_FOLLOWERS,`?follow_followed=${orgIdentity}`)
}

//14 get - org - follower
function* getFollower(follow_follower){
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORG_FOLLOWER)
	try {
		yield fork(sendRequest ,urls.GET_USER_IDENTITY, results.GET_ORG_FOLLOWER , `${follow_follower}` )
		const data = yield take(socketChannel)
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORG_FOLLOWING, payload:{type:types.ERRORS.GET_ORG_FOLLOWING,message}})
	} finally {
		socketChannel.close()
	}
}

//13 get org customer
function* getCustomers(action){ //TODO amir
	const payload = action.payload;
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORG_CUSTOMERS)
	try {
		yield fork(sendRequest ,urls.GET_ORG_CUSTOMERS, results.GET_ORG_CUSTOMERS , `?customer_organization=${organizationId}` )
		const data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.GET_ORG_CUSTOMERS, payload:data })
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORG_CUSTOMERS, payload:{type:types.ERRORS.GET_ORG_CUSTOMERS,message}})
	} finally {
		socketChannel.close()
	}
}
//14 get org certificates
function* getCertificates(action){ //TODO amir change URL nad QUERY
	const payload = action.payload;
	const {organizationId} = payload;
	const socketChannel = yield call(api.createSocketChannel, results.GET_ORG_CERTIFICATES)
	try {
		yield fork(sendRequest ,urls.GET_ORG_CERTIFICATES, results.GET_ORG_CERTIFICATES , `?organization_id=${organizationId}` )
		const data = yield take(socketChannel)
		yield put({ type: types.SUCCESS.GET_ORG_CERTIFICATES, payload:data })
	} catch (e) {
		const {message} = e
		yield put({type:types.ERRORS.GET_ORG_CERTIFICATES, payload:{type:types.ERRORS.GET_ORG_CERTIFICATES,error:message}})
	} finally {
		socketChannel.close()
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
// 9 get org followings
export function* watchGetOrgFollowings(){
	yield takeEvery(types.GET_ORG_FOLLOWINGS, getFollowings)
}
// 10 - get org exchanges 
export function* watchGetOrgExchanges(){
	yield takeEvery(types.GET_ORG_EXCHANGES, getExchanges)
}
//11 - get org customers
export function* watchGetCustomers(){
	yield takeEvery(types.GET_ORG_CUSTOMERS, getCustomers)
}
//12 - get org certificates
export function* watchGetCertificates(){
	yield takeEvery(types.GET_ORG_CERTIFICATES, getCertificates)	
}