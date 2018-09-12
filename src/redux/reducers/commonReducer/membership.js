import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/common/membership'

const membership = (state = initialState.common.membership, action) => {

  switch (action.type) {
    /** -------------------------- get membership by member identity -------------------------> **/
    case types.SUCCESS.COMMON.MEMBERSHIP.GET_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return slices.getMembershipByMemberIdentity.success(state, action)
    /** -------------------------- reset -------------------------> **/
    case types.RESET:
      return initialState.common.post
    default:
      return state
  }
}
export default membership