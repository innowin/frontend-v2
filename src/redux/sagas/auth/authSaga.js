import api from "src/consts/api"
import client from "src/consts/client"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {delay} from "redux-saga"
import {put, take, fork, call, takeEvery} from "redux-saga/effects"
import {persistor} from "src/index"

/**********    %% WORKERS %%    **********/


export function* getOrganizationInSignIn(username) {
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

export function* getExchangeIdentities(identityId) {
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY)
  try {
    yield fork(
      api.get,
      urls.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      results.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      `?identity_id=${identityId}`
    )
    return yield take(socketChannel)
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
      payload: {type: types.ERRORS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, message}
    })
  } finally {
    socketChannel.close()
  }
}

//1 - sign in worker
export function* signIn(action) {
  const {payload} = action
  const {username, password, remember} = payload
  const socketChannel = yield call(api.createSocketChannel, results.SIGN_IN)
  try {
    yield fork(api.post, urls.SIGN_IN, results.SIGN_IN, {username, password})
    let data = yield take(socketChannel)
    if (remember) {
      yield client.setTokenLS(data.token)
    } else {
      yield client.setSessionLS(data.token)
    }
    const hasOrgan = data.profile.is_user_organization
    const userType = (!hasOrgan) ? ('person') : ('org')
    yield client.saveClientUserData(data.user.id, data.identity.id, userType, remember)
    data = {...data, organization: null}
    if (hasOrgan) {
      const organData = yield call(getOrganizationInSignIn, username)
      client.saveClientOrganData(remember, organData.id)
      data = {...data, organization: organData}
    }
    yield delay(500)
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

//2 - Sign Out worker
export function* signOut() {
  yield call(client.clearToken)
  yield persistor.purge()
  yield put({type: types.AUTH.SIGN_OUT_FINISHED, payload: {}})
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