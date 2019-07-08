import initialState from '../initialState'
import types from '../../actions/types'

const proposal = (state = initialState.common.proposal, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.PROPOSAL.GET_PROPOSALS_BY_POST_ID: {
      const {data} = action.payload
      const objData = data.reduce((sum, proposal) => {
        return {...sum, [proposal.id]: {...proposal}}
      }, {})
      return {
        ...state,
        list: {
          ...state.list,
          ...objData,
        },
      }
    }
    case types.SUCCESS.COMMON.PROPOSAL.UPDATE_PROPOSAL: {
      const {data, updateBookmark} = action.payload
      if (updateBookmark === true)
        return {
          ...state,
          list: {
            ...state.list,
            [data.id]: {...state.list[data.id], proposal_bookmarked: data.proposal_bookmarked},
          },
        }
      else return {
        ...state,
        list: {
          ...state.list,
          [data.id]: {...data},
        },
      }
    }
    case types.SUCCESS.COMMON.PROPOSAL.CREATE_PROPOSAL: {
      const {data} = action.payload
      return {
        ...state,
        list: {
          ...state.list,
          [data.id]: {...data},
        },
      }
    }
    case types.RESET:
      return initialState.common.proposal
    default:
      return state
  }
}

export default proposal