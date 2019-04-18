import types from "../types/index"

const getSkillByUserId = ({userId}) => ({
  type: types.SKILL.GET_SKILL_BY_USER_ID,
  payload: {userId}
})

const deleteSkillByUserId = ({skillId, userId}) => ({
  type: types.SKILL.DELETE_SKILL_BY_USER_ID,
  payload: {skillId, userId}
})

const updateSkillByUserId = ({formValues, skillId, userId}) => ({
  type: types.SKILL.UPDATE_SKILL_BY_USER_ID,
  payload: {formValues, skillId, userId}
})

export const createSkill = ({formValues, userId}) => ({
  type: types.SKILL.CREATE_SKILL,
  payload: {formValues, userId}
})

const SkillActions = {
  getSkillByUserId,
  deleteSkillByUserId,
  updateSkillByUserId,
  createSkill,
}

export default SkillActions