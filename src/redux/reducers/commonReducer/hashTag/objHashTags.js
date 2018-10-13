import initialState from '../../initialState'
import types from '../../../actions/types/index'
import appendListToStateList from '../../sliceReducers/utilsSlices/appendListToStateList'


const objHashTags = (state = initialState.common.hashTag.objHashTags, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.GET_OBJ_HASH_TAGS:
      return appendListToStateList.success(state, action)
    case types.RESET:
      return initialState.common.hashTag.objHashTags
    default:
      return state
  }
}

export default objHashTags