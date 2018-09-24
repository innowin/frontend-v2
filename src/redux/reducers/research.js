import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/research'

const users = (state = initialState.research, action) => {
  switch (action.type) {
    /** -------------------------- get research by user id  -------------------------> **/
    case types.SUCCESS.RESEARCH.GET_USER_RESEARCH_BY_USER_ID:
      return slices.getResearchByUserId.success(state, action)
    /** -------------------------- create research by user id -------------------------> **/
    case types.SUCCESS.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID:
      return slices.createResearchByUserId.success(state, action)
    /** -------------------------- delete research by user id -------------------------> **/
    case types.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID:
      return slices.deleteResearchByUserId.base(state, action)
    case types.SUCCESS.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID:
      return slices.deleteResearchByUserId.success(state, action)
    case types.ERRORS.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID:
      return slices.deleteResearchByUserId.error(state, action)
    /** -------------------------- update research by user id  -------------------------> **/
    case types.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID:
      return slices.updateResearchByUserId.base(state, action)
    case types.SUCCESS.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID:
      return slices.updateResearchByUserId.success(state, action)
    case types.ERRORS.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID:
      return slices.updateResearchByUserId.error(state, action)
    /** -------------------------- reset  -------------------------> **/
    case types.RESET:
      return initialState.research
    default:
      return state
  }
}

export default users