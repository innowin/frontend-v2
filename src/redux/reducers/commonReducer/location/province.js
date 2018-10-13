import initialState from '../../initialState';
import types from '../../../actions/types';
import appendListToStateList from '../../sliceReducers/utilsSlices/appendListToStateList'
import pushAnObjToStateList from '../../sliceReducers/utilsSlices/pushAnObjToStateList'


const province = (state = initialState.common.location.province, action) => {
  switch (action.type) {

    case types.SUCCESS.COMMON.GET_PROVINCES:
      return appendListToStateList.success(state, action)

    case types.SUCCESS.COMMON.GET_PROVINCE:
      return pushAnObjToStateList.success(state, action)


    case types.RESET:
      return initialState.common.location.province

    default:
      return {...state}
  }
}

export default province

