import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {select, put, take, fork, call, all} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* createLike(action) {
  console.log("HELLO")
  const {like_sender, like_parent} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.LIKE.CREATE_LIKE)
  const state = yield select()
  const translate = state.intl.messages
  try {
    yield fork(api.patch, urls.COMMON.LIKE, results.COMMON.LIKE.CREATE_LIKE, {like_sender, like_parent})
    const data = yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.LIKE.CREATE_LIKE,
      payload: {data},
    })
    // yield all(postFileIds.map(fileId => put({type: types.COMMON.FILE.UPDATE_FILE, payload: {id: fileId, formData: {file_related_parent: data.id}, fileParentType: constants.FILE_PARENT.POST}})))
    // const postIdentity = data.post_related_identity.id ? data.post_related_identity.id : data.post_related_identity
    // yield put({type: types.COMMON.POST.GET_POST_BY_IDENTITY, payload: {postIdentity, postOwnerId}})
    // yield put({type: types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET, payload: {postParentId, postType: null, limit: 100, offset: 0, postParentType}})

    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create like done'],
          },
        },
      },
    })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.LIKE.CREATE_LIKE,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}