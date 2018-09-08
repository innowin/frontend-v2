import initialState from '../../initialState'
import types from '../../../actions/types'
import replaceListWithData from '../../sliceReducers/utilsSlices/replaceListWithData'


const city = (state = initialState.common.location.city, action) => {
  switch (action.type) {

    case types.SUCCESS.COMMON.GET_CITIES:
      return replaceListWithData.success()

    case types.RESET:
      return initialState.common.location.city

    default:
      return {...state}
  }
}

export default city

