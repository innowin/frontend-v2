import initialState from '../initialState';
import types from '../../actions/types';
import replaceListWithData from '../sliceReducers/utilsSlices/replaceListWithData'


const category = (state = initialState.common.category, action) => {
  switch (action.type) {
      /** -------------------------- get categories -------------------------> **/
    case types.SUCCESS.COMMON.GET_CATEGORIES:
      return replaceListWithData.success(state, action)

    case types.RESET:
      return initialState.common.category

    default:
      return state
  }
};

export default category;