import api from "src/consts/api"
import client from "src/consts/client"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {delay} from "redux-saga"
import {put, take, fork, call, takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

//1 - sign in worker
function* signIn(action) {
  const {payload} = action
  const {username, password, remember, reject} = payload
  const socketChannel = yield call(api.createSocketChannel, results.SIGN_IN)
  try {
    yield fork(api.post, urls.SIGN_IN, results.SIGN_IN, {username, password})
    let data = yield take(socketChannel)
    if (data.non_field_errors) {
      const message = data.non_field_errors[0]
      // this below line is for reject async error form in submit for sign in form
      yield call(reject, 'Password does not correct')
      // below line is for pass error to catch for save error in redux errors
      throw new Error(message)
    }
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
    yield client.saveData(data.user.id, data.identity.id, userType, organizationId, remember)
    if (!remember) {
      yield client.setSessionLS(token)
    } else {
      yield client.setTokenLS(token)
    }
    data = {...data, organization}
    yield put({type: types.SUCCESS.AUTH.SIGN_IN, payload: {data, rememberMe: remember}})
  }
  catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.AUTH.SIGN_IN, payload: {type: types.ERRORS.AUTH.SIGN_IN, message}})
  }
  finally {
    socketChannel.close()
  }
}

function* getOrganizationInSignIn(username) {
  const socketChannel = yield call(api.createSocketChannel, results.ORGANIZATION.GET_ORGANIZATION)
  try {
    yield fork(api.get, urls.ORGANIZATION.GET_ORGANIZATION, results.ORGANIZATION.GET_ORGANIZATION, `?username=${username}`)
    const data = yield take(socketChannel)
    return data[0]
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.GET_ORGANIZATION, payload: {type: types.ERRORS.ORG.GET_ORGANIZATION, message}})
    throw new Error(e)
  } finally {
    socketChannel.close()
  }
}

//2 - Sign Out worker
function* signOut() {
  yield call(client.clearToken)
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