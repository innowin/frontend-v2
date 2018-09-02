import initialState from '../initialState'
import types from '../../actions/types'

// this badge function just set received success badges in user or organ or ...

const badge = (state = initialState.common.badge, action) => {
  const {data} = action.payload || []
  // data's structure is : {[id]:{}}
  switch (action.type) {
    /** --------------------  get user badges --------------------- **/
    // parentId in this section is user identityId
    case types.SUCCESS.COMMON.GET_USER_BADGES:
      return {
        ...state,
        list:{
          ...data
        }
      }

    /** --------------------  get organ badges --------------------- **/
    // parentId in this section is organId
    case types.SUCCESS.COMMON.GET_ORG_BADGES:
      return {
        ...state,
        list:{
          ...data
        }
      }

    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.common.badge
    default:
      return {...state}
  }
}
export default badge