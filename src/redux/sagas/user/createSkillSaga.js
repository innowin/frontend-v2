import types from "../../actions/types"
import {call, fork,take, put, all} from "redux-saga/effects"
import results from "../../../consts/resultName";
import api from "../../../consts/api";
import urls from "../../../consts/URLS";


function* createSkill (action) {
  const {hashTags, ...formValues} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.CREATE_SKILL_RESULT)

  try {
    yield fork(api.post, urls.USER.CREATE_SKILL, results.USER.CREATE_SKILL_RESULT, formValues)
    const data = yield take(socketChannel)
    yield put({
      type: types.SUCCESS.USER.CREATE_SKILL,
      payload: {data}
    })

    if (hashTags) {
      yield all(hashTags.map(tag => {
        const payload = {
          formData: {
            title: tag.label,
            hashtag_base: data.id
          },
          setIdForParentType: types.COMMON.ADD_HASH_TAG_ID_TO_PRODUCT
        }
        return put({type: types.COMMON.CREATE_HASH_TAG_FOR, payload})
      }))
    }
    // yield put({
    //   type: setIdForParentType,
    //   payload: {destinationId: hashtag_base, relatedObjId: related_parent}
    // })

  } catch (error) {
    // yield put({type: types.ERRORS.COMMON.CREATE_HASH_TAG_FOR, error})

  } finally {
    socketChannel.close()
  }
}

export default createSkill