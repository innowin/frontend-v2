import {REST_URL, SOCKET as socket} from "./URLS"
import {GET_VIEWS_COUNT, NEW_VIEW, REST_REQUEST} from "./Events"
import {eventChannel} from "redux-saga"
import {apply, select} from "redux-saga/effects"
import axios from "axios"

axios.defaults.baseURL = REST_URL

const createSocketChannel = (resultName) => {
  return eventChannel(emit => {
    const resultHandler = res => {
      if (res.status === "FAILED") {
        console.groupCollapsed(` %cError  %c${resultName.toUpperCase()}`, "line-height: 1.5 !important; color: red; font-size:11px; font-family: 'dejavu sans mono', monospace; font-weight:lighter;font-size: 11px", "color: #ef8fae; font-size:12px; font-family: 'dejavu sans mono', monospace; font-weight:900;")
        console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", res)
        console.groupEnd("Response")

        if (res.data === 0 && (resultName === "USERNAME_CHECK" || resultName === "EMAIL_CHECK")) {
          emit(res.data)
          return
        }
        // below is for check user handle error
        if (typeof res.data === "object" && res.data.detail) {
          emit(new Error(res.data.detail))
        }
        if (res.data.non_field_errors) {
          emit(new Error(res.data.non_field_errors))
          return
        }
        emit(new Error(res.data))
        return
      }
      if (res.data) {
        if (res.data.results && res.data.count >= 0) {
          emit(res.data.results)
          return
        }
        emit(res.data)
      }
      else emit(res)
    }
    socket.on(resultName, resultHandler)
    return () => socket.off(resultName, resultHandler)
  })
}

const createAxiosChannel = (method, url, data, token) => {
  axios.defaults.headers.common["Authorization"] = `jwt ${token}`
  return eventChannel(emit => {
    let canceler = () => ""
    const CancelToken = axios.CancelToken
    const onUploadProgress = e => {
      emit({canceler})
      if (e.lengthComputable) {
        const progress = Math.floor((e.loaded / e.total) * 100)
        emit({progress})
      }
    }
    axios({
      method,
      data,
      onUploadProgress,
      cancelToken: new CancelToken(c => canceler = c),
      url: `${REST_URL}/${url}/`,
    })
        .then(response => {
          emit({response})
        })
        .catch(error => {
          console.log({axios, error})
          if (axios.isCancel(error)) {
            console.log("in if")
            emit(new Error("Request Canceled", error))
            return
          }
          emit(new Error(error))
        })
    return canceler
  })
}

//1 - req -sending requests
function* get(url, result, param = "", noToken) {
  const token = yield select((state) => state.auth.client.token)
  yield apply({}, getEmit, [url, result, param, token, noToken])
}

function* post(url, result, data, param = "", noToken) {
  const token = yield select((state) => state.auth.client.token)
  yield apply({}, postEmit, [url, result, data, param, token, noToken])
}

function* uploadFileChannel(url, fileObject) {
  const form = new FormData()
  form.append("file", fileObject.file)
  form.append("type", fileObject.type)
  const token = yield select((state) => state.auth.client.token)
  return createAxiosChannel("post", "files", form, token)
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
const getEmit = (url, resultName, query = "", token, noToken) => {
  if (noToken) {
    socket.emit(REST_REQUEST, {
      method: "get",
      url: encodeURI(REST_URL + "/" + url + "/" + query),
      result: resultName,
    })
  }
  else {
    socket.emit(REST_REQUEST, {
      method: "get",
      url: encodeURI(REST_URL + "/" + url + "/" + query),
      result: resultName,
      token,
    })
  }
}

const patchEmit = (urll, resultName, data, query = "", token) => {
  let url
  query === "" ? url = REST_URL + "/" + urll + "/" : url = REST_URL + "/" + urll + "/" + query + "/"
  url = encodeURI(url)
  socket.emit(REST_REQUEST, {
    method: "patch",
    result: resultName,
    url,
    data,
    token,
  })
}

const delEmit = (urll, resultName, data, query = "", token) => {
  let url
  query === "" ? url = REST_URL + "/" + urll + "/" : url = REST_URL + "/" + urll + "/" + query + "/"
  url = encodeURI(url)
  socket.emit(REST_REQUEST, {
    method: "del",
    url,
    result: resultName,
    data,
    token,
  })
}

const postEmit = (url, resultName, data, query = "", token, noToken) => {
  if (noToken) {
    socket.emit(REST_REQUEST, {
      method: "post",
      url: encodeURI(REST_URL + "/" + url + "/" + query),
      result: resultName,
      data,
    })
  }
  else {
    socket.emit(REST_REQUEST, {
      method: "post",
      url: encodeURI(REST_URL + "/" + url + "/" + query),
      result: resultName,
      data,
      token,
    })
  }
}

export const getPostViewerCountEmit = (postId, resultName) => {
  socket.emit(GET_VIEWS_COUNT, {
    id: `post-${postId}`,
    result: resultName,
  })
}

export const setPostViewerEmit = (postId, resultName, token) => {
  socket.emit(NEW_VIEW, {
    id: `post-${postId}`,
    token,
    result: resultName,
  })
}

const api = {
  createSocketChannel,
  uploadFileChannel,
  get,
  post,
  patch,
  del,
  getPostViewerCount,
  setPostViewer,
}
export default api