import api from "src/consts/api";
import results from "src/consts/resultName";
import urls from "src/consts/URLS";
import {call, fork, take, put, cancelled} from "redux-saga/effects";
import types from 'src/redux/actions/types'


function* createFile(action) { // payload?
  const {file_string, nextActionData, nextActionType, fileIdKey, toWhatLayer, fileType, file} = action.payload

  const {formFile, fileId} = file
  const {tempFileKeyName} = nextActionData

  // yield put({type: types.COMMON.FILE.REMOVE_FILE_FROM_TEMP_FILE, payload: {tempFileKeyName: fileId}})
  let channel;
  function onUploadProgress (data) {
    return new Promise((resolve, reject) => {
      if (data.lengthComputable) {
        let progress = Math.floor(+(data.loaded / data.total) * 100)
        resolve(progress)
      }
    })
  }
  try {
    channel = yield call(api.uploadFileChannel, urls.COMMON.FILE, formFile)
    console.log({channel})

    const progressDetail = {
      progress: 0,
      close: channel.close,
    }

    yield put({type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL, payload: {fileId, progressDetail}})
    while (true) {
      const data = yield take(channel)
      if (data.progress) {
        yield put({type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL, payload: {fileId, progressDetail: {progress: data.progress}}})
      }
      else if(data.response) {
        yield put({type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL, payload: {fileId, progressDetail: {close: null}}})
      }
      else if(data.error) {
        throw new Error(data.error.message)
      }
      console.log(data)
    }
  }
  catch(err) {
    if(yield cancelled()) {
      console.log('canceled saga!!')
      channel.close()
    }
    console.trace(err)
  }

  // if (file) {
  //   let reader = new FileReader()
  //   reader.onloadstart = () => {
  //     this.setState({...this.state, isLoadingState: true})
  //   }
  //   reader.onloadend = () => {
  //     handleBase64(reader.result, file)
  //     this.setState({...this.state, isLoadingState: false})
  //   }
  //   reader.onprogress = (data) => {
  //     if (data.lengthComputable) {
  //       let progress = Math.floor(+(data.loaded / data.total) * 100)
  //       console.log({progress, data})
  //     }
  //   }
  //   reader.readAsDataURL(file)
  // }


  // 'nextActionType' used in dynamicResult to avoid from creating two different object in database
  // with the same picture implicitly and unwanted, when creating multiple object and their files
  // in the same time.
  // const dynamicResult = `${results.COMMON.FILE.CREATE_FILE}--${uuid()}`

  // const socketChannel = yield call(api.createSocketChannel, dynamicResult)

  // try {
  //   // const file = {file_string}
  //   yield fork(api.post, urls.COMMON.FILE, dynamicResult, {file_string, type: fileType})
  //   const data = yield take(socketChannel)
  //
  //   // can use 'switch' to assign a value to payload if the 'toWhatLayer' key may be more than 2 !
  //   let payload = nextActionData ? {
  //     ...nextActionData,
  //     [fileIdKey]: data.id
  //   } : {}
  //
  //   if (toWhatLayer === 2) {
  //     if (nextActionData) {
  //       if (nextActionData.nextActionData) {
  //         payload = {
  //           ...nextActionData,
  //           nextActionData: {
  //             ...nextActionData.nextActionData,
  //             [fileIdKey]: data.id
  //           },
  //         }
  //       }
  //     }
  //   }
  //
  //   yield put({type: types.SUCCESS.COMMON.FILE.CREATE_FILE, payload: {data}})
  //   if (nextActionType) yield put({type: nextActionType, payload})
  //
  // } catch (error) {
  //   yield put({type: types.ERRORS.COMMON.FILE.CREATE_FILE, error})
  //
  // } finally {
  //   socketChannel.close()
  // }
}

export default createFile