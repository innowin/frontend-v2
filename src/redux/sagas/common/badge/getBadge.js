import api from "src/consts/api"
import results from "src/consts/resultName"
import urls from "src/consts/URLS"
import {call, fork, take, put} from "redux-saga/effects"
import types from "src/redux/actions/types"
import helpers from "src/consts/helperFunctions/helperFunctions"

export function* getUserBadges(action) {
  const {userId, identityId} = action.payload
  yield put({type:types.COMMON.SET_BADGES_IN_USER, payload:{userId}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_USER_BADGES)
  try {
    yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_USER_BADGES, `?badge_related_parent=${identityId}`)
    const badges = yield take(socketChannel)
    const normalData = helpers.arrayToIdKeyedObject(badges)
    yield put({type: types.SUCCESS.COMMON.GET_USER_BADGES, payload: {data:normalData}})
    yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_USER, payload:{data:badges, userId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_USER, payload: {message, userId}})
  } finally {
    socketChannel.close()
  }
}

export function* getOrganBadges(action) {
  const {organizationId} = action.payload
  yield put({type:types.COMMON.SET_BADGES_IN_ORG, payload:{organizationId}})
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_ORG_BADGES)
  try {
    yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_ORG_BADGES, `?badge_related_parent=${organizationId}`)
    const badges = yield take(socketChannel)
    const normalData = helpers.arrayToIdKeyedObject(badges)
    yield put({type: types.SUCCESS.COMMON.GET_ORG_BADGES, payload: {data:normalData}})
    yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_ORG, payload:{data:badges, organizationId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_ORG, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}


export function* getBadges(action) {
  const {parentId, destinationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_BADGES)
  try {
    yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_BADGES, `?badge_related_parent=${parentId}`)
    const badges = yield take(socketChannel)
    console.log('----saga ----- >> badges is: ', badges)
    // const normalData = helpers.arrayToIdKeyedObject(badges)
    // yield put({type: types.SUCCESS.COMMON.GET_ORG_BADGES, payload: {data:normalData}})
    // yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_ORG, payload:{data:badges, organizationId}})
  } catch (e) {
    // const {message} = e
    // yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_ORG, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}
// ---------------------

const arr = [
  {
    id: 1,
    name: 'ali',
    profile: {
      id: 1,
      family: 'some family'
    },
    org: {
      id: 1,
      title: 'some org',
      office: {
        id: 1,
        address: 'some address'
      }
    }
  },
  {
    id: 1,
    name: 'ali',
    profile: {
      id: 1,
      family: 'some family'
    },
    org: {
      id: 1,
      title: 'some org',
      office: {
        id: 1,
        address: 'some address'
      }
    }
  }
]
const obj = {
  id: 1,
  name: 'ali',
  profile: {
    id: 1,
    family: 'some family'
  },
  org: {
    id: 1,
    title: 'some org',
    office: {
      id: 1,
      address: 'some address'
    }
  }
}

const objNormalizer = (obj) => {
  const nestKeys = Object.keys(obj).filter(key => typeof obj[key] === "object")
  const flatKeys = Object.keys(obj).filter(key => typeof obj[key] !== "object")
  console.log(nestKeys)
  console.log(flatKeys)
  const data = Object.keys(flatKeys).reduce((res, key) => {
    console.log('key is: ', key)
    return {...res, [key]: obj[key]}
  }, {})
  const otherData = nestKeys.reduce((res, key) => {
    const subObj = obj[key]
    data[key] = subObj.id
    const hasNest = Object.values(subObj).some(val => typeof val === "object")
    if (hasNest) return res
    else return {...res, [key]: obj[key]}
  }, {})
  return {data, otherData}
}

console.log(objNormalizer(obj))
// ---------------------

// function* getBadges(action) {
//   const {userId, relatedParentId, nextActionType} = action.payload
//   const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_USER_BADGES)
//   try {
//     yield fork(api.get, urls.COMMON.BADGE, results.COMMON.GET_USER_BADGES, `?badge_related_parent=${identityId}`)
//     const badges = yield take(socketChannel)
//     const normalData = helpers.arrayToIdKeyedObject(badges)
//     yield put({type: types.SUCCESS.COMMON.GET_USER_BADGES, payload: {data:normalData}})
//     yield put({type:types.SUCCESS.COMMON.SET_BADGES_IN_USER, payload:{data:badges, userId}})
//   } catch (e) {
//     const {message} = e
//     yield put({type: types.ERRORS.COMMON.SET_BADGES_IN_USER, payload: {message, userId}})
//   } finally {
//     socketChannel.close()
//   }
// }
//
// export default getBadges