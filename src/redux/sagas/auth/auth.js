import api from "src/consts/api"
import client from "src/consts/client"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {verifyToken} from './verifyToken'
import {delay} from "redux-saga"
import {put, take, fork, call, takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - sign in worker
function* signIn(action) {
  const {payload} = action
  const {username, password, rememberMe, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.SIGN_IN)
  try {
    yield fork(api.post, urls.SIGN_IN, results.SIGN_IN, {username, password})
    let data = yield take(socketChannel)
    const {token} = data
    yield put({type: types.AUTH.SET_TOKEN, payload: {token}})
    yield delay(500)
    const hasOrgan = data.profile.is_user_organization
    let userType = 'person'
    let organizationId = null
    let organization = null
    if (hasOrgan) {
      const organData = yield call(getOrganizationInSignIn, username)
      userType = 'org'
      organizationId = organData.id
      organization = organData
    }
    yield client.saveData(data.user.id, data.identity.id, userType, organizationId, rememberMe)
    if (!rememberMe) {
      yield client.setSessionLS(token)
    } else {
      yield client.setTokenLS(token)
    }
    data = {...data, organization}
    yield put({type: types.SUCCESS.AUTH.SIGN_IN, payload: {data, rememberMe: rememberMe}})
    // after set user & profile data in client should set user and profile data in users in redux state
    const userId = data.user.id
    const userData = data.user
    const profileData = data.profile
    yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: userData, userId}})
    yield put({type: types.SUCCESS.USER.GET_PROFILE_BY_USER_ID, payload: {data: profileData, userId}})
  }
  catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.AUTH.SIGN_IN, payload: {type: types.ERRORS.AUTH.SIGN_IN, message}})
    // this below line is for reject async error form in submit for sign in form
    yield call(reject, 'Password does not correct')
  }
  finally {
    socketChannel.close()
  }
}

function* getOrganizationInSignIn(username) {
  const socketChannel = yield call(api.createSocketChannel, results.ORG.GET_ORGANIZATION)
  try {
    yield fork(api.get, urls.ORG.GET_ORGANIZATION, results.ORG.GET_ORGANIZATION, `?username=${username}`)
    const dataList = yield take(socketChannel)
    // return data for access father to organ data
    return dataList[0]
    // after set organization data in client don't required set organization data in organs in redux state
  } catch (e) {
    // don't has organizationId and don't required put this error
    // throw error for father function
    throw new Error(e)
  } finally {
    socketChannel.close()
  }
}

//2 - Sign Out worker
function* signOut() {
  yield call(client.clearData)
  yield put({type: types.RESET})
  yield put({type: types.AUTH.SIGN_OUT_FINISHED})
}

/**********    %% WATCHERS %%    **********/
//1 - sign In
export function* watchLSignIn() {
  yield takeEvery(types.AUTH.SIGN_IN, signIn)
}

//2 - sign out
export function* watchLSignOut() {
  yield takeEvery(types.AUTH.SIGN_OUT, signOut)
}

//3 - sign in error
export function* watchLSignInError() {
  yield takeEvery(types.ERRORS.AUTH.SIGN_IN, signOut)
}

//4 -verify Token
function* watchVerifyToken() {
  yield takeEvery(types.AUTH.VERIFY_TOKEN, verifyToken)
}

export default {
  watchVerifyToken,
}