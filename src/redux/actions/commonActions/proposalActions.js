import types from '../types'

const createProposal = (description, identityId, postId, fileId) => ({
  type: types.COMMON.PROPOSAL.CREATE_PROPOSAL,
  payload: {description, identityId, postId, fileId},
})

const updateProposal = (formValues, proposalId, updateBookmark) => ({
  type: types.COMMON.PROPOSAL.UPDATE_PROPOSAL,
  payload: {formValues, proposalId, updateBookmark},
})

const getProposalsByPostId = (postId, limit, offset) => ({
  type: types.COMMON.PROPOSAL.GET_PROPOSALS_BY_POST_ID,
  payload: {postId, limit, offset},
})

const ProposalsActions = {
  getProposalsByPostId,
  createProposal,
  updateProposal,
}

export default ProposalsActions