import {SOCKET, REST_URL} from "./URLS"
import {REST_REQUEST} from "./Events"
import {eventChannel} from 'redux-saga'
import {apply, select} from "redux-saga/effects"

const createSocketChannel = (resultName) => {
  return eventChannel(emit => {
    const resultHandler = res => {
      if (res.status !== "OK") {
        console.log('\n --- api --- >> createSocketChannel >> res is : \n', res)
        // below is for check user handle error
        if (typeof res.data === "object" && res.data.detail){
          emit(new Error(res.data.detail))
        }
        if(res.data.non_field_errors){
          emit(new Error(res.data.non_field_errors))
          return;
        }
        emit(new Error(res.data))
        return;
      }
      emit(res.data)
    }
    SOCKET.on(resultName, resultHandler)
    return () => SOCKET.off(resultName, resultHandler)
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

// pre send request
const getEmit = (url, resultName, query = "", token) => {
  SOCKET.emit(REST_REQUEST, {
    method: 'get',
    url: REST_URL + '/' + url + '/' + query,
    result: resultName,
    token
  })
}

const patchEmit = (url, resultName, data, query = "", token) => {
  SOCKET.emit(REST_REQUEST, {
    method: 'patch',
    url: REST_URL + '/' + url + '/' + query + '/',
    result: resultName,
    data,
    token
  })
}

const delEmit = (url, resultName, data, query = "", token) => {
  SOCKET.emit(REST_REQUEST, {
    method: 'del',
    url: REST_URL + '/' + url + '/' + query + '/',
    result: resultName,
    data,
    token
  })
}

const postEmit = (url, resultName, data, query = "", token) => {
  SOCKET.emit(REST_REQUEST, {
    method: 'post',
    url: REST_URL + '/' + url + '/' + query,
    result: resultName,
    data,
    token
  })
}

const api = {
  createSocketChannel,
  get,
  post,
  patch,
  del
}
export default api