import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, put, fork, take} from "redux-saga/effects";
import helpers from "../../../../consts/helperFunctions/helperFunctions"
import types from "../../../actions/types"

function* getObjHashTags(action) {
  const {parentId} = action.payload
  const query = `?hashtag_base=${parentId}`
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_OBJ_HASH_TAGS)

  try {
    yield fork(api.get, urls.COMMON.HASH_TAG, results.COMMON.GET_OBJ_HASH_TAGS, query)
    const data = yield take(socketChannel)
    const {items, ids} = helpers.arrayToIdKeyedObjectWithIds(data)
    yield put({
      type: types.SUCCESS.COMMON.GET_OBJ_HASH_TAGS,
      payload: {data: items, ids, destinationId: parentId}
    })
  } catch (error) {
    // yield put({type: types.ERRORS.COMMON.GET_HASH_TAGS, error})

  } finally {
    socketChannel.close()

  }
}

export default getObjHashTags