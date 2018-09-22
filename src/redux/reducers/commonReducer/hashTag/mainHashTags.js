import initialState from '../../initialState'
import types from '../../../actions/types/index'
import appendListToStateList from "../../sliceReducers/utilsSlices/appendListToStateList";


const hashTag = (state = initialState.common.hashTag, action) => {
  switch (action.type) {

      /** <------------------ get all hashTags ------------------ **/
    case types.SUCCESS.COMMON.GET_HASH_TAGS:
      return appendListToStateList.success(state, action)
      /** ------------------ get all hashTags ------------------> **/

    case types.RESET:
      return initialState.common.hashTag

    default:
      return state
  }
}

export default hashTag