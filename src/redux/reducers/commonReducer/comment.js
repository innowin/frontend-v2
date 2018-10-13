import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/common/comment'


const file = (state = initialState.common.comment, action) => {
  const {data} = action.payload || {}

  switch (action.type) {
      /** -------------------------- get comments by parent id -------------------------> **/
    case types.SUCCESS.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID:
      return slices.getCommentsByParentId.success(state, action)
      /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.common.comment
    default:
      return state
  }
}
export default file