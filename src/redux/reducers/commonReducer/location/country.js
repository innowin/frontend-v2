import initialState from '../../initialState'
import types from '../../../actions/types'
import appendListToStateList from '../../sliceReducers/utilsSlices/appendListToStateList'
import pushAnObjToStateList from '../../sliceReducers/utilsSlices/pushAnObjToStateList'


const country = (state = initialState.common.location.country, action) => {
  switch (action.type) {

    case types.SUCCESS.COMMON.GET_COUNTRIES:
      return appendListToStateList.success(state, action)

    case types.SUCCESS.COMMON.GET_COUNTRY:
      return pushAnObjToStateList.success(state, action)

    case types.RESET:
      return initialState.common.location.country

    default:
      return {...state}
  }
}

export default country