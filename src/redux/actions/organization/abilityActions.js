import types from '../types'

const getAbilitiesByOrganizationId = ({organizationId}) => ({
  type: types.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID,
  payload: {organizationId}
})
const updateAbility = ({formValues, abilityId}) => ({
  type: types.ABILITY.UPDATE_ABILITY,
  payload: {formValues, abilityId}
})

const createAbility = ({formValues, organizationId}) => ({
  type: types.ABILITY.CREATE_ABILITY,
  payload: {formValues, organizationId}
})

const deleteAbility = ({abilityId, organizationId}) => ({
  type: types.ABILITY.DELETE_ABILITY,
  payload: {abilityId, organizationId}
})

const AbilityActions = {
  getAbilitiesByOrganizationId,
  updateAbility,
  createAbility,
  deleteAbility,
}

export default AbilityActions