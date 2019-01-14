import types from "../../actions/types/index"
import {call, fork, take, put, all, select} from "redux-saga/effects"
import results from "../../../consts/resultName";
import api from "../../../consts/api";
import urls from "../../../consts/URLS";
import constants from "../../../consts/constants"
import uuid from 'uuid'


function* createSkill (action) {
  const {hashTags, ...formValues} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.SKILL.CREATE_SKILL_RESULT)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.post, urls.SKILL, results.SKILL.CREATE_SKILL_RESULT, formValues)
    const data = yield take(socketChannel)
    yield put({
      type: types.SUCCESS.SKILL.CREATE_SKILL,
      payload: {data}
    })
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create Ability Done']
          }
        }
      }
    })
    // yield put({ Had Error
    //   type: types.USER.ADD_SKILL_ID_TO_USER,
    //   payload: {destinationId: data.skill_user, relatedObjId: data.id}
    // })
    if (hashTags) {
      yield all(hashTags.map(tag => {
        const payload = {
          formData: {
            title: tag.label,
            hashtag_base: data.id
          },
          setIdForParentType: types.SKILL.ADD_HASH_TAG_ID_TO_Skill
        }
        return put({type: types.COMMON.CREATE_HASH_TAG_FOR, payload})
      }))
    }
  } catch (error) {

  } finally {
    socketChannel.close()
  }
}

export default createSkill