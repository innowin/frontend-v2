import api from "src/consts/api";
import urls from "src/consts/URLS";
import {call, take, put} from "redux-saga/effects";
import types from 'src/redux/actions/types'


function* createFile(action) { // payload?
  const {nextActionData, nextActionType, fileIdKey, toWhatLayer, fileType, file, fileCategory, fileParent} = action.payload
  const {formFile, fileId} = file
  let channel
  const sendFile = {
    file: formFile,
    type: fileType ? fileType : '',
    file_category: fileCategory ? fileCategory : '',
    file_related_parent: fileParent ? fileParent : ''
  }

  try {
    channel = yield call(api.uploadFileChannel, urls.COMMON.FILE, sendFile)
    console.log({channel})

    const progressDetail = {
      progress: 0,
      close: channel.close,
    }

    yield put({type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL, payload: {fileId, progressDetail}})
    let data
    data = yield take(channel)
    if (data.canceler) {
      yield put({
        type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL,
        payload: {fileId, progressDetail: {close: data.canceler}}
      })
    }
    while (true) {
      data = yield take(channel)
      if (data.progress) {
        yield put({
          type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL,
          payload: {fileId, progressDetail: {progress: data.progress}}
        })
      } else if (data.response) {
        const createdFile = data.response.data
        yield put({
          type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL,
          payload: {fileId, progressDetail: {uploadedFileId: createdFile.id, close: null}}
        })
        let payload = nextActionData ? {
          ...nextActionData,
          [fileIdKey]: createdFile.id
        } : {}

        if (toWhatLayer === 2) {
          if (nextActionData) {
            if (nextActionData.nextActionData) {
              payload = {
                ...nextActionData,
                nextActionData: {
                  ...nextActionData.nextActionData,
                  [fileIdKey]: createdFile.id
                },
              }
            }
          }
        }
        yield put({type: types.SUCCESS.COMMON.FILE.CREATE_FILE, payload: {data: createdFile}})
        if (nextActionType) yield put({type: nextActionType, payload})
      }
      console.log(data)
    }
  } catch (err) {
    console.log('catch')
    console.trace(err)
  } finally {
    yield put({type: types.COMMON.FILE.REMOVE_FILE_FROM_TEMP_FILE, payload: {tempFileKeyName: fileId}})
    channel.close()
  }
}

export default createFile