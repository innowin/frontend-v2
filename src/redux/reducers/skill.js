import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/skill'
import createAnObjSlices from './sliceReducers/utilsSlices/createAnObj'
import setRelatedObjIdForListItem from "./sliceReducers/utilsSlices/setRelatedObjIdForListItem";


const skill = (state = initialState.skill, action) => {
  switch (action.type) {
      /** -------------------------- get skill by user id  -------------------------> **/
    case types.SUCCESS.SKILL.GET_SKILL_BY_USER_ID:
      return slices.getSkillByUserId.success(state, action)
      /** -------------------------- delete skill by user id -------------------------> **/
    case types.SKILL.DELETE_SKILL_BY_USER_ID:
      return slices.deleteSkillByUserId.base(state, action)
    case types.SUCCESS.SKILL.DELETE_SKILL_BY_USER_ID:
      return slices.deleteSkillByUserId.success(state, action)
    case types.ERRORS.SKILL.DELETE_SKILL_BY_USER_ID:
      return slices.deleteSkillByUserId.error(state, action)
      /** -------------------------- update skill by user id  -------------------------> **/
    case types.SKILL.UPDATE_SKILL_BY_USER_ID:
      return slices.updateSkillByUserId.base(state, action)
    case types.SUCCESS.SKILL.UPDATE_SKILL_BY_USER_ID:
      return slices.updateSkillByUserId.success(state, action)
    case types.ERRORS.SKILL.UPDATE_SKILL_BY_USER_ID:
      return slices.updateSkillByUserId.error(state, action)
      /* < ------------------ create skill -----------------  */
    case types.SKILL.CREATE_SKILL:
      return createAnObjSlices.base(state, action)
    case types.SUCCESS.SKILL.CREATE_SKILL:
      return createAnObjSlices.success(state, action)
    case types.SKILL.ADD_HASH_TAG_ID_TO_Skill:
      return setRelatedObjIdForListItem.success(state, action, 'hashTags')
      /*   ------------------ create skill ---------------- > */
      /** -------------------------- reset  -------------------------> **/
    case types.RESET:
      return initialState.skill
    default:
      return state
  }
}
export default skill
