import initialState from '../../initialState'
import types from '../../../actions/types'
import appendListToStateList from '../../sliceReducers/utilsSlices/appendListToStateList'
import pushAnObjToStateList from '../../sliceReducers/utilsSlices/pushAnObjToStateList'


const city = (state = initialState.common.location.city, action) => {
  switch (action.type) {

    case types.SUCCESS.COMMON.GET_CITIES:
      return appendListToStateList.success(state, action)

    case types.SUCCESS.COMMON.GET_CITY:
      return pushAnObjToStateList.success(state, action)

    case types.RESET:
      return initialState.common.location.city

    default:
      return {...state}
  }
}

export default city

