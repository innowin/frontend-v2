import api from "src/consts/api"
import client from "src/consts/client"
import results from "src/consts/resultName"
import constants from 'src/consts/constants'
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {getOrgIdentity} from "../getIdentity"
import {delay} from "redux-saga"
import {put, take, fork, call} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

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
      yield put({type:types.COMMON.FILE.GET_FILE, payload:{fileId:organLogoId}})
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

export function* signIn(action) {
  const {payload} = action
  const {username, password, rememberMe, reject} = payload
	const socketChannel = yield call(api.createSocketChannel, results.SIGN_IN)
  try {
		yield fork(api.post, urls.SIGN_IN, results.SIGN_IN, {username, password})
    const primaryData = yield take(socketChannel)
    const {token} = primaryData
    yield put({type: types.AUTH.SET_TOKEN, payload: {token}})
    yield delay(500)
    const hasOrgan = primaryData.profile.is_user_organization
    let userType = constants.USER_TYPES.PERSON
    let organizationId = null
    let organization = null
    let identity = primaryData.identity
    if (hasOrgan) {
      const organData = yield call(getOrganizationInSignIn, username)
      userType = constants.USER_TYPES.ORG
      organizationId = organData.id
      organization = organData
      const organAction = {payload:{organizationId}}
      identity = yield call(getOrgIdentity, organAction)
      yield put({type: types.SUCCESS.ORG.GET_ORGANIZATION, payload: {data:organization, organizationId}})
    }
    yield client.saveData(primaryData.user.id, identity.id, userType, organizationId, rememberMe)
    if (!rememberMe) {
      yield client.setSessionLS(token)
    } else {
      yield client.setTokenLS(token)
    }
    const finalData = {...primaryData, identity, organization}
    yield put({type: types.SUCCESS.AUTH.SIGN_IN, payload: {data:finalData, rememberMe: rememberMe}})
    // after set user & profile data in client should set user and profile data in users in redux state
    const userId = finalData.user.id
    const userData = finalData.user
    const profileData = finalData.profile
    const profileMediaId = profileData.profile_media
    const profileBannerId = profileData.profile_banner
    if (profileMediaId) {
      yield put({type: types.COMMON.FILE.GET_FILE, payload: {fileId: profileMediaId}})
    }
    if (profileBannerId && profileBannerId !== profileMediaId) {
      yield put({type: types.COMMON.FILE.GET_FILE, payload: {fileId: profileBannerId}})
    }
    yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: userData, userId}})
    yield put({type: types.SUCCESS.USER.GET_PROFILE_BY_USER_ID, payload: {data: profileData, userId}})
    yield put({type: types.SUCCESS.USER.GET_USER_IDENTITY, payload: {data: primaryData.identity, userId}})
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

export function* signOut() {
  yield call(client.clearData)
  yield put({type: types.RESET})
  yield put({type: types.AUTH.SIGN_OUT_FINISHED})
}