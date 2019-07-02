import types from '../types'

const createProposal = (description, identityId, postId) => ({
  type: types.COMMON.PROPOSAL.CREATE_PROPOSAL,
  payload: {description, identityId, postId},
})

const updateProposal = (formValues, proposalId) => ({
  type: types.COMMON.PROPOSAL.UPDATE_PROPOSAL,
  payload: {formValues, proposalId},
})

const getProposalsByPostId = (postId, limit, offset) => ({
  type: types.COMMON.PROPOSAL.GET_PROPOSALS_BY_POST_ID,
  payload: {postId, limit, offset},
})

const ProposalsActions = {
  getProposalsByPostId,
  createProposal,
  updateProposal
}

export default ProposalsActions