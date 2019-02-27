import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call, all, select} from "redux-saga/effects"
import constants from 'src/consts/constants'
import uuid from "uuid"

export function* updatePost(action) {
  const {formValues, postId, postOwnerId, postFileIds} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.UPDATE_POST)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.patch, urls.COMMON.POST, results.COMMON.POST.UPDATE_POST, formValues, `${postId}`)
    const data = yield take(socketChannel)

    if(postFileIds){
      yield all(postFileIds.map(fileId => {
        return put({
          type: types.COMMON.FILE.UPDATE_FILE,
          payload: {id: fileId, formData: {file_related_parent: data.id}, fileParentType: constants.FILE_PARENT.POST}
        })
      }))
    }
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Update Post Done']
          }
        }
      }
    })
    const postIdentity = data.post_related_identity
    yield put({type: types.SUCCESS.COMMON.POST.UPDATE_POST , payload:{data, postId, postOwnerId}})
    yield put({type: types.COMMON.POST.GET_POST_BY_IDENTITY , payload:{postIdentity, postOwnerId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.UPDATE_POST,
      payload: {message, postId}
    })
  } finally {
    socketChannel.close()
  }
}