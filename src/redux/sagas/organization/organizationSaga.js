import types from 'src/redux/actions/actionTypes'
import urls from 'src/consts/URLS'
import {put, take, fork, takeEvery, call, all} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'

function* createSimpleChannel(result, url, type, query = '') {
  const socketChannel = yield call(api.createSocketChannel, result)
  let data
  try {
    yield fork(api.get, url, result, query)
    data = yield take(socketChannel)
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS[type], payload: {type: types.ERRORS[type], message}})
  } finally {
    socketChannel.close()
    return data
  }
}

/**********    %% WORKERS %%    **********/

//1 - get org worker
export function* getOrganization(action) {
  const payload = action.payload
  const {organizationId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORGANIZATION)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_ORGANIZATION, results.ORGANIZTION.GET_ORGANIZATION, organizationId)
    // while (true) {
    const data = yield take(socketChannel)
    alert(typeof data)
    yield put({type: types.SUCCESS.ORGANIZTION.GET_ORGANIZATION, payload: data})
    // }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.GET_ORGANIZATION, payload: {type: types.ERRORS.ORGANIZTION.GET_ORGANIZATION, message}})
  } finally {
    socketChannel.close()
  }
}

//2 - get org success
function getOrganizationSuccess(action) {
  const {organizationId} = action.payload
}

//3 - get organization members
function* getOrganizationMembers(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORGANIZATION_MEMBERS)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_ORGANIZATION_MEMBERS, results.ORGANIZTION.GET_ORGANIZATION_MEMBERS, `?staff_organization=${organizationId}`)
    while (true) {
      const data = yield take(socketChannel)
      yield put({type: types.SUCCESS.ORGANIZTION.GET_ORGANIZATION_MEMBERS, payload: data})
    }
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORGANIZTION.GET_ORGANIZATION_MEMBERS,
      payload: {type: types.ERRORS.ORGANIZTION.GET_ORGANIZATION_MEMBERS, message}
    })
  } finally {
    socketChannel.close()
  }
}

//5 - update - organization
function* updateOrganization(action) {
  const payload = action.payload
  const {organizationId, formValues, hideEdit} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.UPDATE_ORGANIZATION_INFO)
  try {
    yield fork(api.patch, urls.ORGANIZTION.UPDATE_ORGANIZATION_INFO, results.ORGANIZTION.UPDATE_ORGANIZATION_INFO, formValues, `${organizationId}/`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.UPDATE_ORGANIZATION_INFO, payload: data})

  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORGANIZTION.UPDATE_ORGANIZATION_INFO,
      payload: {type: types.ERRORS.ORGANIZTION.UPDATE_ORGANIZATION_INFO, message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

//6 - get - products
function* getProducts(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const identity = yield* getOrgIdentity(action)
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_PRODUCTS)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_PRODUCTS, results.ORGANIZTION.GET_PRODUCTS, `?product_owner=${identity}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.GET_PRODUCTS, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.GET_PRODUCTS, payload: {type: types.ERRORS.ORGANIZTION.GET_PRODUCTS, message}})
  } finally {
    socketChannel.close()
  }
}

// 7 - get - followers
function* getFollowers(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const identity = yield* getOrgIdentity(action)
  let followers = yield* getFollowersIdentities(identity[0].id)
  followers = followers.map((val, idx) => {
    return getFollower(val.follow_follower)
  })
  const results = yield* all(followers)
}

// 8 - get - followings
function* getFollowings(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const identity = yield* getOrgIdentity(action)
  const followings = yield* getFollowingsIdentities(identity[0].id)
  followings.map((val, idx) => {
    return getFollowing(val.follow_followed)
  })
  const results = yield* all(followings)
}

// 9 - get - exchanges
function* getExchanges(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const identity = yield getOrgIdentity(action)
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORG_EXCHANGES)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_ORG_EXCHANGES, results.ORGANIZTION.GET_ORG_EXCHANGES, `?identity_id=${identity[0].id}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.GET_ORG_EXCHANGES, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.GET_ORG_EXCHANGES, payload: {type: types.ERRORS.ORGANIZTION.GET_ORG_EXCHANGES, message}})
  } finally {
    socketChannel.close()
  }
}

//10 get - org - identity
function* getOrgIdentity(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_USER_IDENTITY)
  let res
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_USER_IDENTITY, results.ORGANIZTION.GET_USER_IDENTITY, `?identity_organization=${organizationId}`)
    const data = yield take(socketChannel)
    res = data
    yield put({type: types.SUCCESS.ORGANIZTION.GET_USER_IDENTITY, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.GET_USER_IDENTITY, payload: {type: types.ERRORS.ORGANIZTION.GET_USER_IDENTITY, message}})
  } finally {
    socketChannel.close()
    return res
  }
}

//11 get - org- followings identities
function* getFollowingsIdentities(orgIdentity) {
  let data
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORG_FOLLOWINGS_IDENTITIES)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_ORG_FOLLOWERS, results.ORGANIZTION.GET_ORG_FOLLOWINGS_IDENTITIES, `?follow_follower=${orgIdentity}`)
    data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.GET_ORG_FOLLOWINGS_IDENTITIES, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORGANIZTION.GET_ORG_FOLLOWINGS_IDENTITIES,
      payload: {type: types.ERRORS.ORGANIZTION.GET_ORG_FOLLOWINGS_IDENTITIES, message}
    })
  } finally {
    socketChannel.close()
    return data
  }
}

//12 get following
function* getFollowing(follow_followed) {
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORG_FOLLOWING)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_USER_IDENTITY, results.ORGANIZTION.GET_ORG_FOLLOWING, `${follow_followed}`)
    const data = yield take(socketChannel)
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.GET_ORG_FOLLOWING, payload: {type: types.ERRORS.ORGANIZTION.GET_ORG_FOLLOWING, message}})
  } finally {
    socketChannel.close()
  }
}

//13 get - org - followers identities
function* getFollowersIdentities(orgIdentity) {
  return yield createSimpleChannel('get-followers-identities', 'organizations/follows', types.GET_ORG_FOLLOWERS, `?follow_followed=${orgIdentity}`)
}

//14 get - org - follower
function* getFollower(follow_follower) {
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORG_FOLLOWER)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_USER_IDENTITY, results.ORGANIZTION.GET_ORG_FOLLOWER, `${follow_follower}`)
    const data = yield take(socketChannel)
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.GET_ORG_FOLLOWING, payload: {type: types.ERRORS.ORGANIZTION.GET_ORG_FOLLOWING, message}})
  } finally {
    socketChannel.close()
  }
}

//13 get org customer
function* getCustomers(action) { //TODO amir
  const payload = action.payload;
  const {organizationId} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORG_CUSTOMERS)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_ORG_CUSTOMERS, results.ORGANIZTION.GET_ORG_CUSTOMERS, `?customer_organization=${organizationId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.GET_ORG_CUSTOMERS, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.GET_ORG_CUSTOMERS, payload: {type: types.ERRORS.ORGANIZTION.GET_ORG_CUSTOMERS, message}})
  } finally {
    socketChannel.close()
  }
}

//14 get org certificates
function* getCertificates(action) { //TODO amir change URL nad QUERY
  const payload = action.payload;
  const {organizationId} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.GET_ORG_CERTIFICATES)
  try {
    yield fork(api.get, urls.ORGANIZTION.GET_ORG_CERTIFICATES, results.ORGANIZTION.GET_ORG_CERTIFICATES, `?organization_id=${organizationId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.GET_ORG_CERTIFICATES, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORGANIZTION.GET_ORG_CERTIFICATES,
      payload: {type: types.ERRORS.ORGANIZTION.GET_ORG_CERTIFICATES, error: message}
    })
  } finally {
    socketChannel.close()
  }
}

//15 update certificate
function* updateCertificate(action) { //TODO amir change URL nad QUERY
  const payload = action.payload;
  const {formValues, certId, hideEdit} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.UPDATE_CERTIFICATE)
  try {
    yield fork(api.patch, urls.ORGANIZTION.UPDATE_CERTIFICATE, results.ORGANIZTION.UPDATE_CERTIFICATE, formValues, `/${certId}/`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.UPDATE_CERTIFICATE, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.UPDATE_CERTIFICATE, payload: {type: types.ERRORS.ORGANIZTION.UPDATE_CERTIFICATE, error: message}})
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

// 16 update customer
function* updateCustomer(action) { //TODO amir change URL nad QUERY
  const payload = action.payload;
  const {formValues, customerId, hideEdit} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.UPDATE_CUSTOMER)
  try {
    yield fork(api.patch, urls.ORGANIZTION.UPDATE_CUSTOMER, results.ORGANIZTION.UPDATE_CUSTOMER, formValues, `${customerId}/`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.UPDATE_CUSTOMER, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.UPDATE_CUSTOMER, payload: {type: types.ERRORS.ORGANIZTION.UPDATE_CUSTOMER, error: message}})
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

function* createProduct(action){
  const payload = action.payload;
  const {formValues, organizationId, hideEdit} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZTION.CREATE_PRODUCT)
  try {
    yield fork(api.patch, urls.ORGANIZTION.CREATE_PRODUCT, results.ORGANIZTION.CREATE_PRODUCT, formValues, `${organizationId}/`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORGANIZTION.CREATE_PRODUCT, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORGANIZTION.CREATE_PRODUCT, payload: {type: types.ERRORS.ORGANIZTION.CREATE_PRODUCT, error: message}})
  } finally {
    socketChannel.close()
    hideEdit()
  }
}
/**********    %% WATCHERS %%    **********/
//1 - get organization
export function* watchGetOrganization() {
  yield takeEvery(types.GET_ORGANIZATION, getOrganization)
}

//2 - get organization - success
export function* watchGetOrganizationSuccess() {
  yield takeEvery(types.SUCCESS.ORGANIZTION.GET_ORGANIZATION, getOrganizationSuccess)
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
export function* watchGetOrgFollowers() {
  yield takeEvery(types.GET_ORG_FOLLOWERS, getFollowers)
}

// 9 get org followings
export function* watchGetOrgFollowings() {
  yield takeEvery(types.GET_ORG_FOLLOWINGS, getFollowings)
}

// 10 - get org exchanges
export function* watchGetOrgExchanges() {
  yield takeEvery(types.GET_ORG_EXCHANGES, getExchanges)
}

//11 - get org customers
export function* watchGetCustomers() {
  yield takeEvery(types.GET_ORG_CUSTOMERS, getCustomers)
}

//12 - get org certificates
export function* watchGetCertificates() {
  yield takeEvery(types.GET_ORG_CERTIFICATES, getCertificates)
}

//13 - update org certificate
export function* watchUpdateCertificate() {
  yield takeEvery(types.UPDATE_CERTIFICATE, updateCertificate)
}

//14 - update org customer
export function* watchUpdateCustomer() {
  yield takeEvery(types.UPDATE_CUSTOMER, updateCustomer)
}

//15 create product
export function* watchCreateProduct() {
  yield takeEvery(types.CREATE_PRODUCT, createProduct)
}