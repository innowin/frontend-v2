import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getProposals = state => state.common.proposal.list
const getUsers = state => state.identities.list
const getPostProposals = (state, props) => {
  const {post} = props
  const parentId = post.id
  if (state.common.post.list[parentId])
    return state.common.post.list[parentId].proposals && state.common.post.list[parentId].proposals.list
}

export const ProposalsSelector = createSelector(
    [getProposals, getPostProposals, getUsers],
    (proposals, postProposals, users) => {
      if (proposals && Object.keys(proposals).length !== 0 && postProposals && users) {
        return helpers.getObjectOfArrayKeysSortByReverseCreateTime(postProposals, proposals).reduce((sum, pro) => {
          return [...sum, {...pro, proposal_identity: users[pro.proposal_identity]}]
        }, [])
      }
      else return []
    },
)

