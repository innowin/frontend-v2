import initialState from '../initialState'
import types from '../../actions/types'


const university = (state = initialState.common.university, action) => {
  switch (action.type) {
    case types.SUCCESS.COMMON.GET_UNIVERSITIES: {
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
    default: {
      return {...state}
    }
  }
}

export default university