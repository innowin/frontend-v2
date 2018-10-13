import initialState from '../initialState';
import types from '../../actions/types';
// import replaceListWithData from '../sliceReducers/utilsSlices/replaceListWithData'
import appendListToStateList from '../sliceReducers/utilsSlices/appendListToStateList'
import pushAnObjToStateList from '../sliceReducers/utilsSlices/pushAnObjToStateList'


const category = (state = initialState.common.category, action) => {
  switch (action.type) {
      /** -------------------------- get categories -------------------------> **/
    case types.SUCCESS.COMMON.GET_CATEGORIES:
      return appendListToStateList.success(state, action)

    case types.SUCCESS.COMMON.GET_CATEGORY:
      return pushAnObjToStateList.success(state, action)

    case types.RESET:
      return initialState.common.category

    default:
      return state
  }
};

export default category;