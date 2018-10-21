import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/common/exchangeMembership'

const exchangeMembership = (state = initialState.common.exchangeMembership, action) => {

  switch (action.type) {
    /** -------------------------- get exchange membership by member identity -------------------------> **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return slices.getExchangeMembershipByMemberIdentity.success(state, action)
      /** -------------------------- get exchange membership by exchange id (Added by hoseyn!) -------------------------> **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID:
      return slices.getExchangeMembershipByExchangeId.success(state, action)
    /** -------------------------- delete exchange membership -------------------------> **/
    case types.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP:
      return slices.deleteExchangeMembership.base(state, action)
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP:
      return slices.deleteExchangeMembership.success(state, action)
    case types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP:
      return slices.deleteExchangeMembership.error(state, action)
    /** -------------------------- reset -------------------------> **/
    case types.RESET:
      return initialState.common.exchangeMembership
    default:
      return state
  }
}
export default exchangeMembership