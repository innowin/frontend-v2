import api from 'src/consts/api'
import results from 'src/consts/resultName'
import urls from 'src/consts/URLS'
import {fork, call} from 'redux-saga/effects'

export function* setDevice() {
  const socketChannel = yield call(api.createSocketChannel, results.SET_DEVICE)
  try {
    yield fork(api.post, urls.USERS_DEVICES, results.SET_DEVICE, {
      fingerprint: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      device_os: navigator && navigator.platform,
      device_vendor: navigator && navigator.vendor,
      device_agent: navigator && navigator.userAgent,
      language: navigator && navigator.languages && navigator.languages.reduce((sum, p) => sum + ' ' + p, ''),
      device_current_screen_resolution: `${document.body.clientWidth}*${document.body.clientHeight}`,
    })
  }
  catch (e) {

  }
  finally {
    socketChannel.close()
  }
}