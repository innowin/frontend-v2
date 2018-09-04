import initialState from '../../initialState'
import types from '../../../actions/types/index'

const mainHashTag = (state = initialState.common.hashTag.mainHashTags, action) => {
  const list = state.list
  const {data} = action.payload || {}

  switch (action.type) {

      /** <------------------ get all hashTags ------------------ **/
    case types.COMMON.GET_HASH_TAGS:
      return {...state}

    case types.SUCCESS.COMMON.GET_HASH_TAGS:
      return {
        ...state,
        list: {...list, ...data}
      }

    case types.ERRORS.COMMON.GET_HASH_TAGS:
      return {
        ...state, // NOTE! : this need for more error handling.
      }
      /** ------------------ get all hashTags ------------------> **/


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

export default mainHashTag