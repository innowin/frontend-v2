import types from 'src/redux/actions/types'
import {takeEvery} from 'redux-saga/effects'

import {getProposalsByPostId} from './getProposalsByPostId'
import {createProposal} from './createProposal'
import {updateProposal} from './updateProposal'


function* watchGetProposalsByParentId() {
  yield takeEvery(types.COMMON.PROPOSAL.GET_PROPOSALS_BY_POST_ID, getProposalsByPostId)
}

function* watchCreateProposal() {
  yield takeEvery(types.COMMON.PROPOSAL.CREATE_PROPOSAL, createProposal)
}

function* watchUpdateProposal() {
  yield takeEvery(types.COMMON.PROPOSAL.UPDATE_PROPOSAL, updateProposal)
}

export default [
  watchGetProposalsByParentId(),
  watchCreateProposal(),
  watchUpdateProposal(),
]