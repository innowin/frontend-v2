import initialState from '../../initialState';
import types from '../../../actions/types';
import replaceListWithData from "../../sliceReducers/utilsSlices/replaceListWithData";


const province = (state = initialState.common.location.province, action) => {
  switch (action.type) {

    case types.SUCCESS.COMMON.GET_PROVINCES:
      return replaceListWithData.success(state, action)

    case types.RESET:
      return initialState.common.location.province

    default:
      return {...state}
  }
}

export default province

