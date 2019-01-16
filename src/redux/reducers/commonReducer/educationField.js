import initialState from '../initialState'
import types from '../../actions/types'



const educationField = (state = initialState.common.educationField, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.GET_EDUCATION_FIELDS:
    {
      const {data, isLoading} = action.payload
      let allUniversities = {}
      data.forEach(uni => {
        allUniversities[uni.id] = {...uni}
      })
      return {
        ...state,
        list: {...state.list, ...allUniversities},
        isLoading: isLoading
      }
    }
    default:
    {
      return {...state}
    }
  }
}

export default educationField