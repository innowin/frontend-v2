import api from "src/consts/api"
import urls from "src/consts/URLS"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import {put, take, fork, call, select} from "redux-saga/effects"
import constants from "src/consts/constants"
import uuid from "uuid"

export function* deletePost(action) {
  const {postId, postOwnerId, postParentId, postParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.DELETE_POST)
  const state = yield select()
  const translate = state.intl.messages

  try {
    yield fork(api.del, urls.COMMON.POST, results.COMMON.POST.DELETE_POST, "", `${postId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.POST.DELETE_POST,
      payload: {postId, postOwnerId, postParentId, postParentType},
    })
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.WARNING,
          content: {
            text: translate["Post removed"],
          },
        },
      },
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.DELETE_POST,
      payload: {message, postId},
    })
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.ERROR,
          content: {
            text: translate["Post not removed error"],
          },
        },
      },
    })
  } finally {
    socketChannel.close()
  }
}