import initialState from '../../initialState'
import types from '../../../actions/types/index'

const mainHashTag = (state = initialState.common.hashTag.mainHashTags, action) => {
  const list = state.list
  const {data} = action.payload || {}

  switch (action.type) {

      /** <------------------ get all hashTags ------------------ **/
    case types.SUCCESS.COMMON.GET_HASH_TAGS:
      return {
        ...state,
        list: {...list, ...data}
      }
      /** ------------------ get all hashTags ------------------> **/
    case types.RESET:
      return initialState.common.hashTag
    default:
      return { ...state }
  }
}

export default mainHashTag