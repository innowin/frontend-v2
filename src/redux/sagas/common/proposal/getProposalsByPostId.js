import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getProposalsByPostId(action) {
  const {postId, limit = 100, offset} = action.payload
  let params = `?proposal_parent=${postId}`
  if (limit) params += `&limit=${limit}`
  if (offset) params += `&offset=${offset}`
  const result = results.COMMON.PROPOSAL.GET_PROPOSALS_BY_POST_ID + postId + Math.random()
  const socketChannel = yield call(api.createSocketChannel, result)
  try {
    yield fork(api.get, urls.COMMON.PROPOSAL, result, params, true)
    let data = yield take(socketChannel)
    for (let i = 0; i < data.length; i++) {
      yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: data[i].proposal_identity, userId: data[i].proposal_identity.id}})
      data[i].proposal_identity = data[i].proposal_identity.id
    }
    yield put({type: types.SUCCESS.COMMON.PROPOSAL.GET_PROPOSALS_BY_POST_ID, payload: {data, postId}})
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.PROPOSAL.GET_PROPOSALS_BY_POST_ID,
      payload: {message, postId},
    })
  }
  finally {
    socketChannel.close()
  }
}