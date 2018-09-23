import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/workExperience'

const users = (state = initialState.workExperience, action) => {
  switch (action.type) {
    /** -------------------------- get work experience by user id  -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.getWorkExperienceByUserId.success(state, action)
    /** -------------------------- update work experience by user id  -------------------------> **/
    case types.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.updateWorkExperienceByUserId.base(state, action)
    case types.SUCCESS.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.updateWorkExperienceByUserId.success(state, action)
    case types.ERRORS.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.updateWorkExperienceByUserId.error(state, action)
    /** -------------------------- create work experience by user id -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.createWorkExperienceByUserId.success(state, action)
    /** -------------------------- delete work experience by user id -------------------------> **/
    case types.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.deleteWorkExperienceByUserId.base(state, action)
    case types.SUCCESS.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.deleteWorkExperienceByUserId.success(state, action)
    case types.ERRORS.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.deleteWorkExperienceByUserId.error(state, action)
    /** -------------------------- reset users -------------------------> **/
    case types.RESET:
      return initialState.workExperience
    default:
      return state
  }
}

export default users