import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork, take, put} from "redux-saga/effects";
import types from '../../../actions/types'


function* createFile(action) { // payload?
  const {file_string, nextActionData, nextActionType, fileIdKey, toWhatLayer} = action.payload

  // 'nextActionType' used in dynamicResult to avoid from creating two different object in database
  // with the same picture implicitly and unwanted, when creating multiple object and their files
  // in the same time.
  const dynamicResult = `${results.COMMON.CREATE_FILE}--${nextActionType || ''}--${file_string}`

  const socketChannel = yield call(api.createSocketChannel, dynamicResult)

  try {
    // const file = {file_string}
    yield fork(api.post, urls.COMMON.FILE, dynamicResult, {file_string})
    const data = yield take(socketChannel)

    // can use 'switch' to assign a value to payload if the 'toWhatLayer' key may be more than 2 !
    let payload = nextActionData ? {
      ...nextActionData,
      [fileIdKey]: data.id
    } : {}

    if (toWhatLayer === 2) {
      if (nextActionData) {
        if (nextActionData.nextActionData) {
          payload = {
            ...nextActionData,
            nextActionData: {
              ...nextActionData.nextActionData,
              [fileIdKey]: data.id
            },
          }
        }
      }
    }

    yield put({type: types.SUCCESS.COMMON.CREATE_FILE, payload: {data}})
    if (nextActionType) yield put({type: nextActionType, payload})

  } catch (error) {
    yield put({type: types.ERRORS.COMMON.CREATE_FILE, error})

  } finally {
    socketChannel.close()
  }
}

export default createFile