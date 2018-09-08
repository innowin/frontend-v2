import initialState from '../../initialState'
import types from '../../../actions/types'
import replaceListWithData from "../../sliceReducers/utilsSlices/replaceListWithData";


const country = (state = initialState.common.location.country, action) => {
  switch (action.type) {

    case types.SUCCESS.COMMON.GET_COUNTRIES:
      return replaceListWithData.success()

    case types.RESET:
      return initialState.common.location.country

    default:
      return {...state}
  }
}

export default country