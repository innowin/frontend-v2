import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call} from 'redux-saga/effects'
import api from 'src/consts/api'
import results from 'src/consts/resultName'
import {addPicture} from '../../../crud/organization/products'
import {getOrgIdentity} from "../getIdentity"


export function* getOrganizationMembers(action) {
  const payload = action.payload
  const {organizationId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORGANIZATION_MEMBERS)
  try {
    yield fork(api.get, urls.ORG.GET_ORGANIZATION_MEMBERS, results.ORG.GET_ORGANIZATION_MEMBERS, `?staff_organization=${organizationId}`)
    while (true) {
      const data = yield take(socketChannel)
      yield put({type: types.SUCCESS.ORG.GET_ORGANIZATION_MEMBERS, payload: {data}})
    }
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORGANIZATION_MEMBERS,
      payload: {type: types.ERRORS.ORG.GET_ORGANIZATION_MEMBERS, message}
    })
  } finally {
    socketChannel.close()
  }
}

export function* getProducts(action) {
  const payload = action.payload
  const {organizationId} = payload
  const identity = yield* getOrgIdentity(action)
  const categories = yield* getProductCategories()
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCTS)
  try {
    yield fork(api.get, urls.ORG.GET_PRODUCTS, results.ORG.GET_PRODUCTS, `?product_owner=${identity[0].id}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_PRODUCTS, payload: {products: data, categories}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_PRODUCTS, payload: {type: types.ERRORS.ORG.GET_PRODUCTS, message}})
  } finally {
    socketChannel.close()
  }
}

export function* getFollowers(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const identity = yield* getOrgIdentity(action)
  let followers = yield* getFollowersIdentities(identity[0].id)
  let users = []
  followers.map((val, idx) => {
    users.push(val.follow_follower)
  })
  // const results = yield all(followers)
  if (users.length > 0) {
    yield put({type: types.SUCCESS.ORG.GET_ORG_FOLLOWERS, payload: users})
  }
}

export function* getFollowings(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const identity = yield* getOrgIdentity(action)
  const followings = yield* getFollowingsIdentities(identity[0].id)
  let users = []
  followings.map((val, idx) => {
    users.push(val.follow_followed)
  })
  yield put({type: types.SUCCESS.ORG.GET_ORG_FOLLOWINGS, payload: users})
}

export function* getExchanges(action) {
  const payload = action.payload
  const {organizationId} = payload;
  const identity = yield getOrgIdentity(action)
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_EXCHANGES)
  try {
    yield fork(api.get, urls.ORG.GET_ORG_EXCHANGES, results.ORG.GET_ORG_EXCHANGES, `?identity_id=${identity[0].id}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_ORG_EXCHANGES, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORG_EXCHANGES,
      payload: {type: types.ERRORS.ORG.GET_ORG_EXCHANGES, message}
    })
  } finally {
    socketChannel.close()
  }
}

// get - org- followings identities
export function* getFollowingsIdentities(orgIdentity) {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_FOLLOWINGS_IDENTITIES)
  try {
    yield fork(api.get, urls.ORG.GET_ORG_FOLLOWINGS_IDENTITIES, results.ORG.GET_ORG_FOLLOWINGS_IDENTITIES, `?follow_follower=${orgIdentity}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_ORG_FOLLOWINGS_IDENTITIES, payload: data})
    return data
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORG_FOLLOWINGS_IDENTITIES,
      payload: {type: types.ERRORS.ORG.GET_ORG_FOLLOWINGS_IDENTITIES, message}
    })
  } finally {
    socketChannel.close()
  }
}

export function* getFollowing(follow_followed) {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_FOLLOWINGS)
  try {
    yield fork(api.get, urls.GET_IDENTITY, results.ORG.GET_ORG_FOLLOWINGS, `${follow_followed}`)
    return yield take(socketChannel)
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORG_FOLLOWINGS,
      payload: {type: types.ERRORS.ORG.GET_ORG_FOLLOWINGS, message}
    })
  } finally {
    socketChannel.close()
  }
}

// get - org - followers identities
export function* getFollowersIdentities(orgIdentity) {
  let data
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_FOLLOWERS_IDENTITIES)
  try {
    yield fork(api.get, urls.ORG.GET_ORG_FOLLOWERS_IDENTITIES, results.ORG.GET_ORG_FOLLOWERS_IDENTITIES, `?follow_followed=${orgIdentity}`)
    data = yield take(socketChannel)
    // yield put({type: types.SUCCESS.ORG.GET_ORG_FOLLOWERS_IDENTITIES, payload: {followers:data}})
    return data
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORG_FOLLOWERS_IDENTITIES,
      payload: {type: types.ERRORS.ORG.GET_ORG_FOLLOWERS_IDENTITIES, message}
    })
  } finally {
    socketChannel.close()
  }
  // return yield createSimpleChannel(results.ORG.GET_ORG_FOLLOWERS, urls.ORG.GET_ORG_FOLLOWERS, types.ORG.GET_ORG_FOLLOWERS, `?follow_followed=${orgIdentity}`)
}

// get - org - follower
export function* getFollower(follow_follower) {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_FOLLOWERS)
  try {
    yield fork(api.get, urls.GET_IDENTITY, results.ORG.GET_ORG_FOLLOWERS, `${follow_follower}`)
    return yield take(socketChannel)
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORG_FOLLOWERS,
      payload: {type: types.ERRORS.ORG.GET_ORG_FOLLOWERS, message}
    })
  } finally {
    socketChannel.close()
  }
}

// get org customer
export function* getCustomers(action) { //TODO amir
  const payload = action.payload;
  const {organizationId} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_CUSTOMERS)
  try {
    yield fork(api.get, urls.ORG.GET_ORG_CUSTOMERS, results.ORG.GET_ORG_CUSTOMERS, `?customer_organization=${organizationId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_ORG_CUSTOMERS, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORG_CUSTOMERS,
      payload: {type: types.ERRORS.ORG.GET_ORG_CUSTOMERS, message}
    })
  } finally {
    socketChannel.close()
  }
}

// get org certificates
export function* getCertificates(action) { //TODO amir change URL nad QUERY
  const payload = action.payload;
  const {identityId} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORG_CERTIFICATES)
  try {
    yield fork(api.get, urls.ORG.GET_ORG_CERTIFICATES, results.ORG.GET_ORG_CERTIFICATES, `?certificate_identity=${identityId}`)
    const data = yield take(socketChannel)
    if (typeof data === "string") {
      yield put({
        type: types.ERRORS.ORG.GET_ORG_CERTIFICATES,
        payload: {type: types.ERRORS.ORG.GET_ORG_CERTIFICATES, error: "Request Failed"}
      })
    } else {
      yield put({type: types.SUCCESS.ORG.GET_ORG_CERTIFICATES, payload: data})
    }
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_ORG_CERTIFICATES,
      payload: {type: types.ERRORS.ORG.GET_ORG_CERTIFICATES, error: message}
    })
  } finally {
    socketChannel.close()
  }
}

export function* updateCertificate(action) { //TODO amir change URL nad QUERY
  const payload = action.payload;
  const {formValues, certId, hideEdit} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_CERTIFICATE)
  try {
    yield fork(api.patch, urls.UPDATE_CERTIFICATE, results.UPDATE_CERTIFICATE, formValues, `/${certId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.UPDATE_CERTIFICATE, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.UPDATE_CERTIFICATE,
      payload: {type: types.ERRORS.ORG.UPDATE_CERTIFICATE, error: message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

export function* updateCustomer(action) { //TODO amir change URL nad QUERY
  const payload = action.payload;
  const {formValues, customerId, hideEdit} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_CUSTOMER)
  try {
    yield fork(api.patch, urls.ORG.UPDATE_CUSTOMER, results.ORG.UPDATE_CUSTOMER, formValues, `${customerId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.UPDATE_CUSTOMER, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.UPDATE_CUSTOMER,
      payload: {type: types.ERRORS.ORG.UPDATE_CUSTOMER, error: message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

// create org products
export function* createProduct(action) {
  const payload = action.payload;
  const {formValues, identityId, hideEdit} = payload;
  // const identity = yield* getOrgIdentity(action)
  formValues.product_owner = identityId
  const socketChannel = yield call(api.createSocketChannel, results.ORG.CREATE_PRODUCT)
  try {
    yield fork(api.post, urls.ORG.CREATE_PRODUCT, results.ORG.CREATE_PRODUCT, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.CREATE_PRODUCT, payload: data})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.CREATE_PRODUCT, payload: {type: types.ERRORS.ORG.CREATE_PRODUCT, error: message}})
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

// get products categories
export function* getProductCategories() {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCT_CATEGORIES)
  try {
    yield fork(api.get, urls.ORG.GET_PRODUCT_CATEGORIES, results.ORG.GET_PRODUCT_CATEGORIES)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_PRODUCT_CATEGORIES, payload: data})
    return data
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_PRODUCT_CATEGORIES,
      payload: {type: types.ERRORS.ORG.GET_PRODUCT_CATEGORIES, message}
    })
  } finally {
    socketChannel.close()
  }
}

// update org products
export function* updateProduct(action) {
  const payload = action.payload
  const {formValues, productId, hideEdit} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_PRODUCT)
  try {
    yield fork(api.patch, urls.ORG.UPDATE_PRODUCT, results.ORG.UPDATE_PRODUCT, formValues, `${productId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.UPDATE_PRODUCT, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.UPDATE_PRODUCT,
      payload: {type: types.ERRORS.ORG.UPDATE_PRODUCT, error: message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

// get product picture org
export function* getProductPicture(productId) {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCT_PICTURE)
  try {
    yield fork(api.get, urls.ORG.GET_PRODUCT_PICTURE, results.ORG.GET_PRODUCT_PICTURE, `?picture_product=${productId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_PRODUCT_PICTURE, payload: data})
    return data
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_PRODUCT_PICTURE,
      payload: {type: types.ERRORS.ORG.GET_PRODUCT_PICTURE, error: message}
    })
  } finally {
    socketChannel.close()
  }
}

// add picture product org
export function* addPictureProduct(action) {
  const payload = action.payload;
  const {formValues, productId, hideEdit} = payload;
  formValues.picture_product = productId;
  const socketChannel = yield call(api.createSocketChannel, results.ORG.ADD_PRODUCT_PICTURE)
  try {
    yield fork(api.post, urls.ORG.ADD_PRODUCT_PICTURE, results.ORG.ADD_PRODUCT_PICTURE, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.ADD_PRODUCT_PICTURE, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.ADD_PRODUCT_PICTURE,
      payload: {type: types.ERRORS.ORG.ADD_PRODUCT_PICTURE, error: message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

export function* getProductsSuccess(action) {
  const {products} = action.payload;
  for (let i = 0; i < products.length; i++) {
    yield getProductPicture(products[i].id)
    yield getProductPrice(products[i].id)
  }
}

export function* getProductPrice(productId) {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_PRODUCT_PRICE)
  try {
    yield fork(api.get, urls.ORG.GET_PRODUCT_PRICE, results.ORG.GET_PRODUCT_PRICE, `?price_product=${productId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_PRODUCT_PRICE, payload: data})
    return data
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_PRODUCT_PRICE,
      payload: {type: types.ERRORS.ORG.GET_PRODUCT_PRICE, error: message}
    })
  } finally {
    socketChannel.close()
  }
}

export function* deleteProduct(action) {
  const {productId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.DELETE_PRODUCT)
  try {
    yield fork(api.del, urls.ORG.DELETE_PRODUCT, results.ORG.DELETE_PRODUCT, {}, `${productId}`)
    yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.DELETE_PRODUCT, payload: {productId}})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.DELETE_PRODUCT,
      payload: {type: types.ERRORS.ORG.DELETE_PRODUCT, error: message}
    })
  } finally {
    socketChannel.close()
  }
}

export function* createCertificate(action) {
  const payload = action.payload;
  const {formValues, identityId, userId, hideEdit} = payload;
  // const identity = yield* getOrgIdentity(action)
  formValues.certificate_identity = identityId
  formValues.certificate_parent = userId
  const socketChannel = yield call(api.createSocketChannel, results.ORG.CREATE_CERTIFICATE)
  try {
    yield fork(api.post, urls.ORG.CREATE_CERTIFICATE, results.ORG.CREATE_CERTIFICATE, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.CREATE_CERTIFICATE, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.CREATE_CERTIFICATE,
      payload: {type: types.ERRORS.ORG.CREATE_CERTIFICATE, error: message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

// get org staff
export function* getOrgStaff(action) {
  const payload = action.payload;
  const {organizationId} = payload;
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_STAFF)
  try {
    yield fork(api.get, urls.ORG.GET_STAFF, results.ORG.GET_STAFF, `?staff_organization=${organizationId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.GET_STAFF, payload: data})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.GET_STAFF,
      payload: {type: types.ERRORS.ORG.GET_STAFF, message}
    })
  } finally {
    socketChannel.close()
  }
}

// createOrgCustomer
export function* createOrgCustomer(action) {
  const payload = action.payload
  const {organizationId, formValues, hideEdit} = payload
  formValues.customer_organization = organizationId
  const socketChannel = yield call(api.createSocketChannel, results.ORG.CREATE_CUSTOMER)
  try {
    yield fork(api.post, urls.ORG.CREATE_CUSTOMER, results.ORG.CREATE_CUSTOMER, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.CREATE_CUSTOMER, payload: {customer: data}})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.CREATE_CUSTOMER,
      payload: {type: types.ERRORS.ORG.CREATE_CUSTOMER, error: message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

export function* deleteOrgCustomer(action) {
  const payload = action.payload
  const {customerId, hideEdit} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.DELETE_CUSTOMER)
  try {
    yield fork(api.del, urls.ORG.DELETE_CUSTOMER, results.ORG.DELETE_CUSTOMER, {}, `${customerId}`)
    yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.DELETE_CUSTOMER, payload: {customerId: customerId}})
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.ORG.DELETE_CUSTOMER,
      payload: {type: types.ERRORS.ORG.DELETE_CUSTOMER, error: message}
    })
  } finally {
    socketChannel.close()
    hideEdit()
  }
}

export function* agencyRequest(action) {
  const payload = action.payload
  const {description, hideLoading} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.AGENCY_REQUEST)
  try {
    yield fork(api.post, urls.ORG.AGENCY_REQUEST, results.ORG.AGENCY_REQUEST, {agent_request_description: description})
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.AGENCY_REQUEST, payload: {request: data}})
    hideLoading("با موفقیت ثبت گشت")
  } catch (e) {
    const {message} = e
    hideLoading('این درخواست قبلا ثبت شده است')
    yield put({type: types.ERRORS.ORG.AGENCY_REQUEST, payload: {type: types.ERRORS.ORG.AGENCY_REQUEST, error: message}})
  } finally {
    socketChannel.close()
  }
}