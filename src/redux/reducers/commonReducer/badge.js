import initialState from '../initialState'
import types from '../../actions/types'

// this badge function just set received success badges in user or organ or ...

const badges = (state = initialState.common.badges, action) => {
  const {data} = action.payload || []
  switch (action.type) {
    /** --------------------  get user badges --------------------- **/
    // parentId in this section is user identityId
    case types.SUCCESS.COMMON.GET_USER_BADGES:
      return {
        ...state,
        ...data
      }

    /** --------------------  get organ badges --------------------- **/
    // parentId in this section is organId
    case types.SUCCESS.COMMON.GET_ORG_BADGES:
      return {
        ...state,
        ...data
      }

    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.common.badges
    default:
      return {...state}
  }
}
export default badges