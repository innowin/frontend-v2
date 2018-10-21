import initialState from '../../initialState/index'
import types from '../../../actions/types/index'
import appendListToStateList from '../../sliceReducers/utilsSlices/appendListToStateList'


const badgeCategories = (state = initialState.common.badges.badgeCategory, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.GET_BADGES_CATEGORY:
      return appendListToStateList.success(state, action)

    case types.RESET:
      return initialState.common.badges.badgeCategory
    default:
      return state
  }
}
export default badgeCategories