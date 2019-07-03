import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, fork, call, take} from 'redux-saga/effects'
import uuid from 'uuid'
import constants from 'src/consts/constants'

// update user by user id
export function* updateProposal(action) {
  const {payload} = action
  const {formValues, proposalId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.PROPOSAL.UPDATE_PROPOSAL)
  try {
    yield fork(api.patch, urls.COMMON.PROPOSAL, results.COMMON.PROPOSAL.UPDATE_PROPOSAL, formValues, `${proposalId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.PROPOSAL.UPDATE_PROPOSAL, payload: {data}})
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: 'پیشنهاده شما با موفقیت بروز شد',
          },
        },
      },
    })
  }
  catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.PROPOSAL.UPDATE_PROPOSAL, payload: {message}})
  }
  finally {
    socketChannel.close()
  }
}