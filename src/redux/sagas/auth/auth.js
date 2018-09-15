import api from "src/consts/api"
import client from "src/consts/client"
import results from "src/consts/resultName"
import constants from 'src/consts/constants'
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {verifyToken} from './verifyToken'
import {getOrgIdentity} from "../getIdentity"
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
    let userType = constants.USER_TYPES.PERSON
    let organizationId = null
    let organization = null
    let identity = data.identity
    if (hasOrgan) {
      const organData = yield call(getOrganizationInSignIn, username)
      userType = constants.USER_TYPES.ORG
      organizationId = organData.id
      organization = organData
      const organAction = {payload:{organizationId}}
      identity = yield call(getOrgIdentity, organAction)
    }
    yield client.saveData(data.user.id, identity.id, userType, organizationId, rememberMe)
    if (!rememberMe) {
      yield client.setSessionLS(token)
    } else {
      yield client.setTokenLS(token)
    }
    data = {...data, identity, organization}
    yield put({type: types.SUCCESS.AUTH.SIGN_IN, payload: {data, rememberMe: rememberMe}})
    // after set user & profile data in client should set user and profile data in users in redux state
    const userId = data.user.id
    const userData = data.user
    const profileData = data.profile
    const profileMediaId = profileData.profile_media
    const profileBannerId = profileData.profile_banner
    if (profileMediaId) {
      yield put({type: types.COMMON.GET_FILE, payload: {fileId: profileMediaId}})
    }
    if (profileBannerId && profileBannerId !== profileMediaId) {
      yield put({type: types.COMMON.GET_FILE, payload: {fileId: profileBannerId}})
    }
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
  const resultName1 = results.ORG.GET_ORGANIZATION + 1
  const resultName2 = results.ORG.GET_ORGANIZATION + 2
  const socketChannel1 = yield call(api.createSocketChannel, resultName1)
  const socketChannel2 = yield call(api.createSocketChannel, resultName2)
  try {
    yield fork(api.get, urls.ORG.GET_ORGANIZATION, resultName1, `?username=${username}`)
    const dataList = yield take(socketChannel1)
    const incompleteOrgan = dataList[0]
    yield fork(api.get, urls.ORG.GET_ORGANIZATION, resultName2, incompleteOrgan.id)
    const data = yield take(socketChannel2)
    const organLogoId = data.organization_logo
    if (organLogoId) {
      yield put({type:types.COMMON.GET_FILE, payload:{fileId:organLogoId}})
    }
    // return data for access father to organ data
    return data
  } catch (e) {
    // throw error for father function
    throw new Error(e)
  } finally {
    socketChannel1.close()
    socketChannel2.close()
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
export function* watchSignIn() {
  yield takeEvery(types.AUTH.SIGN_IN, signIn)
}

//2 - sign out
export function* watchSignOut() {
  yield takeEvery(types.AUTH.SIGN_OUT, signOut)
}

//3 - sign in error
export function* watchSignInError() {
  yield takeEvery(types.ERRORS.AUTH.SIGN_IN, signOut)
}

//4 -verify Token
function* watchVerifyToken() {
  yield takeEvery(types.AUTH.VERIFY_TOKEN, verifyToken)
}

export default {
  watchVerifyToken,
}