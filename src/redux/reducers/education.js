import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/education'

const users = (state = initialState.education, action) => {
  switch (action.type) {
    /** -------------------------- get education by user id  -------------------------> **/
    case types.SUCCESS.EDUCATION.GET_USER_EDUCATION_BY_USER_ID:
      return slices.getEducationByUserId.success(state, action)
    /** -------------------------- create education by user id -------------------------> **/
    case types.SUCCESS.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID:
      return slices.createEducationByUserId.success(state, action)
    /** -------------------------- delete education by user id -------------------------> **/
    case types.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID:
      return slices.deleteEducationByUserId.base(state, action)
    case types.SUCCESS.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID:
      return slices.deleteEducationByUserId.success(state, action)
    case types.ERRORS.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID:
      return slices.deleteEducationByUserId.error(state, action)
    /** -------------------------- update education by user id  -------------------------> **/
    case types.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID:
      return slices.updateEducationByUserId.base(state, action)
    case types.SUCCESS.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID:
      return slices.updateEducationByUserId.success(state, action)
    case types.ERRORS.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID:
      return slices.updateEducationByUserId.error(state, action)
    /** -------------------------- reset  -------------------------> **/
    case types.RESET:
      return initialState.education
    default:
      return state
  }
}

export default users