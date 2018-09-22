import types from '../types/index'


export const createSkillAction = (payload) => ({
  type: types.SKILL.CREATE_SKILL,
  payload
})