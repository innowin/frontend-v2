import types from "../../../actions/types"
import {call, fork, take, put} from "redux-saga/effects"
import results from "src/consts/resultName";
import api from "src/consts/api";
import urls from "src/consts/URLS";


function* createHashTagFor(action) {
  const {setIdForParentType, formData} = action.payload
  const dynamicResult = results.COMMON.CREATE_HASH_TAG_FOR + formData.title
  const socketChannel = yield call(api.createSocketChannel, dynamicResult)
  console.log('--- saga >> createHashTagFor >> action is: ', action)
  try {
    yield fork(api.post, urls.COMMON.HASH_TAG, dynamicResult, formData)
    const data = yield take(socketChannel)
    const {hashtag_base, related_parent} = data
    console.log(`---- saga ----- >> createHashTag >> data is: `, data)
    yield put({
      type: setIdForParentType,
      payload: {destinationId: hashtag_base, relatedObjId: related_parent}
    })

  } catch (error) {
    yield put({type: types.ERRORS.COMMON.CREATE_HASH_TAG_FOR, error})

  } finally {
    socketChannel.close()
  }
}

export default createHashTagFor