import {REST_URL, SOCKET as socket} from "./URLS"
import {GET_VIEWS_COUNT, NEW_VIEW, REST_REQUEST} from "./Events"
import {eventChannel} from 'redux-saga'
import {apply, select} from "redux-saga/effects"
import results from "src/consts/resultName"

const createSocketChannel = (resultName) => {
  return eventChannel(emit => {
    const resultHandler = res => {
      if (res.status === "FAILED") {
        console.log(`\n --- api --- >> createSocketChannel >> res  in ${resultName} is : \n`, res)
        // below is for check user handle error
        if (typeof res.data === "object" && res.data.detail) {
          emit(new Error(res.data.detail))
        }
        if (res.data.non_field_errors) {
          emit(new Error(res.data.non_field_errors))
          return;
        }
        if (res.data === 0 && (resultName === 'USERNAME_CHECK' || resultName === 'EMAIL_CHECK')) {
          emit(res.data)
          return;
        }
        emit(new Error(res.data))
        return;
      }
      if (res.data) {
        emit(res.data)
      } else emit(res)
    }
    socket.on(resultName, resultHandler)
    return () => socket.off(resultName, resultHandler)
  })
}

//1 - req -sending requests
function* get(url, result, param = "") {
  const token = yield select((state) => state.auth.client.token)
  yield apply({}, getEmit, [url, result, param, token])
}

function* post(url, result, data, param = "") {
  const token = yield select((state) => state.auth.client.token)
  yield apply({}, postEmit, [url, result, data, param, token])
}

function* patch(url, result, data, param = "") {
  const token = yield select((state) => state.auth.client.token)
  yield apply({}, patchEmit, [url, result, data, param, token])
}

function* del(url, result, data, param = "") {
  const token = yield select((state) => state.auth.client.token)
  yield apply({}, delEmit, [url, result, data, param, token])
}

function* getPostViewerCount(postId, result) {
  yield apply({}, getPostViewerCountEmit, [postId, result])
}

function* setPostViewer(postId, result) {
  const token = yield select((state) => state.auth.client.token)
  yield apply({}, setPostViewerEmit, [postId, result, token])
}

// pre send request
const getEmit = (url, resultName, query = "", token) => {
  socket.emit(REST_REQUEST, {
    method: 'get',
    url: REST_URL + '/' + url + '/' + query,
    result: resultName,
    token
  })
}

const patchEmit = (urll, resultName, data, query = "", token) => {
  let url
  query === "" ? url = REST_URL + '/' + urll + '/' : url = REST_URL + '/' + urll + '/' + query + '/'
  socket.emit(REST_REQUEST, {
    method: 'patch',
    result: resultName,
    url,
    data,
    token
  })
}

const delEmit = (url, resultName, data, query = "", token) => {
  socket.emit(REST_REQUEST, {
    method: 'del',
    url: REST_URL + '/' + url + '/' + query + '/',
    result: resultName,
    data,
    token
  })
}

const postEmit = (url, resultName, data, query = "", token) => {
  if (resultName !== results.USER.USERNAME_CHECK
    && resultName !== results.USER.EMAIL_CHECK
    && resultName !== results.USER.CREATE_USER_PERSON
    && resultName !== results.USER.CREATE_USER_ORGAN) {
    socket.emit(REST_REQUEST, {
      method: 'post',
      url: REST_URL + '/' + url + '/' + query,
      result: resultName,
      data,
      token
    })
  } else {
    socket.emit(REST_REQUEST, {
      method: 'post',
      url: REST_URL + '/' + url + '/' + query,
      result: resultName,
      data
    })
  }
}

export const getPostViewerCountEmit = (postId, resultName) => {
  socket.emit(GET_VIEWS_COUNT, {
    id: `post-${postId}`,
    result: resultName
  })
}

export const setPostViewerEmit = (postId, resultName, token) => {
  socket.emit(NEW_VIEW, {
    id: `post-${postId}`,
    token,
    result: resultName
  })
}

const api = {
  createSocketChannel,
  get,
  post,
  patch,
  del,
  getPostViewerCount,
  setPostViewer
}
export default api