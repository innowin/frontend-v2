import types from '../types'


export const createSkillAction = (payload) => ({
  type: types.USER.CREATE_SKILL,
  payload
})