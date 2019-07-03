import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'
import constants from 'src/consts/constants'
import uuid from 'uuid'

export function* createProposal(action) {
  const {description, identityId, postId, fileId} = action.payload
  const formValues = {
    proposal_description: description,
    proposal_identity: identityId,
    proposal_parent: postId,
    proposal_file: fileId,
  }
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.PROPOSAL.CREATE_PROPOSAL)
  try {
    yield fork(api.post, urls.COMMON.PROPOSAL, results.COMMON.PROPOSAL.CREATE_PROPOSAL, formValues)
    const data = yield take(socketChannel)
    console.log('data after create: ', data)
    data.proposal_identity = identityId
    yield put({type: types.SUCCESS.COMMON.PROPOSAL.CREATE_PROPOSAL, payload: {data, postId}})

    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: 'پیشنهاده شما با موفقیت ثبت شد',
          },
        },
      },
    })
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.PROPOSAL.CREATE_PROPOSAL,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}