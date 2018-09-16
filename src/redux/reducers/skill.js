import types from '../actions/types'
import initialState from './initialState'
import createAnObjSlices from './sliceReducers/utilsSlices/createAnObj'


const skill = (state=initialState.skills, action) => {
  switch (action.type) {
    case types.USER.CREATE_SKILL:
      return createAnObjSlices.base(state, action)
    case types.SUCCESS.USER.CREATE_SKILL:
      return createAnObjSlices.success(state, action)
    default:
      return state
  }
}
export default skill