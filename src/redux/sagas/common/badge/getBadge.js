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

const flattenEr = (obj, nestKeys) => {
  return Object.keys(obj).reduce((data, key) => {
    if (nestKeys.includes(key)) return {...data, [key]: obj[key].id}
    else return {...data, [key]: obj[key]}
  }, {})
}
const objNormalizer = (objs) => {
  const data = {
    badges: {},
    categories: {},
    medias: {},
    users: {}
  }
  objs.forEach(obj => {
    const {badges, categories, medias, users} = data
    badges[obj.id] = flattenEr(obj, ['badge_related_badge_category'])
    const category = obj['badge_related_badge_category']
    categories[category.id] = flattenEr(category, ['badge_related_media', 'badge_related_user'])
    const media = category['badge_related_media']
    const user = category['badge_related_user']
    medias[media.id] = media
    users[user.id] = user
  })
  return data
}

const tt = (mainObj) => {
  const data = {}
  const objs = {entity: {...mainObj}}
  for (let i = 0; i < Object.keys(objs).length; i++) {
    const normalKey = Object.keys(objs)[i]
    console.log("objs is; ", objs)
    const obj = objs[normalKey]
    const nestKeys = Object.keys(obj).filter(key => typeof obj[key] === 'object')
    data[normalKey] = flattenEr(obj, nestKeys)
    nestKeys.forEach(nestKey => {
      objs[nestKey] = obj[nestKey]
    })
  }
  // Object.keys(objs).forEach(normalKey => {
  //   console.log("objs is; ", objs)
  //   const obj = objs[normalKey]
  //   const nestKeys = Object.keys(obj).filter(key => typeof obj[key] === 'object')
  //   data[normalKey] = flattenEr(obj, nestKeys)
  //   nestKeys.forEach(nestKey => {
  //     objs[nestKey] = obj[nestKey]
  //   })
  // })
  return data
}

console.log('tt: ', tt(
    {
      a: 1,
      b: {
        id: 'b1',
        name: 'b1b',
        c: {
          id: 'c1',
          name: 'c1c'
        }
      }
}))

const badges = [
  {
    id: 8430,
    badge_related_badge_category: {
      id: 2524,
      created_time: "2018-08-11T13:04:10.719229Z",
      updated_time: "2018-08-11T13:04:10.719247Z",
      delete_flag: false,
      badge_title: "ماهر",
      badge_description: null,
      badge_related_media: {
        id: 1,
        file: "http://restful.daneshboom.ir/media/ebe4484e6ce74e249b46bd6eaf0a0144.jpg",
        create_time: "2018-05-30T08:17:56.279923Z",
        info: "{\"size\": 12250}",
        delete_flag: false,
        identity: 38,
        uploader: 10
      },
      badge_related_user: {
        id: 4,
        password: "pbkdf2_sha256$30000$gNVW2hohTesj$0iG/owaZB0XB++xEDaw3+baKhPCbv2Ag4TWDb/fzy8g=",
        last_login: null,
        is_superuser: false,
        username: "mohsen",
        first_name: "",
        last_name: "",
        email: "",
        is_staff: false,
        is_active: true,
        date_joined: "2018-05-26T15:07:01.733690Z",
        groups: [],
        user_permissions: []
      },
      badge_category_related_parent: null
    },
    created_time: "2018-10-01T06:43:22.875280Z",
    updated_time: "2018-10-01T06:43:22.875318Z",
    delete_flag: false,
    badge_active: false,
    badge_show_navigation: false,
    badge_related_parent: 8397
  },
  {
    id: 8431,
    badge_related_badge_category: {
      id: 2549,
      created_time: "2018-08-13T13:43:29.083636Z",
      updated_time: "2018-08-13T13:43:29.083653Z",
      delete_flag: false,
      badge_title: "حجاب برتر",
      badge_description: null,
      badge_related_media: {
        id: 3,
        file: "http://restful.daneshboom.ir/media/75f00defdde44fd4b0d8bee05617e9c7.jpg",
        create_time: "2018-05-30T15:49:41.363845Z",
        info: "{\"size\": 47887}",
        delete_flag: false,
        identity: 26,
        uploader: 8
      },
      badge_related_user: {
        id: 2,
        password: "pbkdf2_sha256$30000$EoCtBBH4igaP$LRg1V1XfP4kK/TmeHaF4hF7HPZW0z7Cn/IDeBCrCwas=",
        last_login: "2018-05-27T08:47:18.735653Z",
        is_superuser: true,
        username: "amir",
        first_name: "امیر",
        last_name: "",
        email: "",
        is_staff: true,
        is_active: true,
        date_joined: "2018-05-26T15:03:28.914304Z",
        groups: [],
        user_permissions: []
      },
      badge_category_related_parent: null
    },
    created_time: "2018-10-01T06:46:26.573646Z",
    updated_time: "2018-10-01T06:46:26.573669Z",
    delete_flag: false,
    badge_active: false,
    badge_show_navigation: false,
    badge_related_parent: 8397
  }
]
console.log('-----------------objNormalizer(badges) : ', objNormalizer(badges))
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