import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {select, put, take, fork, call, all} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'
import {delay} from 'redux-saga'

export function* createPost(action) {
  const {formValues, postParentId, postParentType, postFileIds} = action.payload
  const result = `${results.COMMON.POST.CREATE_POST}-${Math.random()}`
  const socketChannel = yield call(api.createSocketChannel, result)
  try {
    yield fork(api.post, urls.COMMON.POST, result, formValues)
    const data = yield take(socketChannel)
    yield all(postFileIds.map(fileId => put({type: types.COMMON.FILE.UPDATE_FILE, payload: {id: fileId, formData: {file_related_parent: data.id}, fileParentType: constants.FILE_PARENT.POST}})))
    yield put({type: types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET, payload: {postParentId, postType: null, limit: 1, offset: 0, postParentType}})

    const state = yield select()
    const translate = state.intl.messages
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create post done'],
          },
        },
      },
    })

    yield delay(1000)
    const identity = yield select(state => state.auth.client.identity.content)
    yield put({
      type: types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
      payload: {identityId: identity, exchangeMembershipOwnerId: identity},
    })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.POST.CREATE_POST,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}