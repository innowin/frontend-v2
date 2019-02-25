import api from "src/consts/api"
import client from "src/consts/client"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {delay} from "redux-saga"
import {put, take, fork, call} from "redux-saga/effects"

import type {identityType} from 'src/consts/flowTypes/identityType.js'

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
		yield fork(api.post, urls.SIGN_IN, results.SIGN_IN, {username: username.toLowerCase(), password})
    const primaryData = yield take(socketChannel)
    const {token, identity} = primaryData
    yield put({type: types.AUTH.SET_TOKEN, payload: {token}})
    yield delay(500)
    let userType = identity.identity_type
    yield client.saveData({identityId: identity.id, userType, remember: rememberMe})
    if (!rememberMe) {
      yield client.setSessionLS(token)
    } else {
      yield client.setTokenLS(token)
    }
    yield put({type: types.SUCCESS.AUTH.SIGN_IN, payload: {data:primaryData, rememberMe: rememberMe}})
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