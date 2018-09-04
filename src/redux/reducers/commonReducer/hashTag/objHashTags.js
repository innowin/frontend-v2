import initialState from '../../initialState'
import types from '../../../actions/types/index'

const objHashTag = (state = initialState.common.hashTag.objHashTags, action) => {
  const list = state.list
  const {data} = action.payload || {}

  switch (action.type) {
      // /** <----------------- create new hashTag for an obj ------ **/
      // case types.COMMON.CREATE_HASH_TAG_FOR:
      //     return {
      //         ...state,
      //     }
      //
      // case types.SUCCESS.CREATE_HASH_TAG_FOR:
      //     return {
      //         ...state,
      //         list: {...list, [data.id]: data}
      //     }
      //
      // case types.ERRORS.CREATE_HASH_TAG_FOR:
      //     return {
      //         ...state
      //     }
      // /** ------------------ create new hashTag for an obj -----> **/
    case types.RESET:
      return initialState.common.hashTag
    default:
      return { ...state }
  }
}

export default objHashTag