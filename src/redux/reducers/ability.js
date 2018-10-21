import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/ability'

const ability = (state = initialState.ability, action) => {
  switch (action.type) {
      /** -------------------------- get ability by organization id  -------------------------> **/
    case types.SUCCESS.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID:
      return slices.getAbilitiesByOrganizationId.success(state, action)
      /** -------------------------- create ability -------------------------> **/
    case types.SUCCESS.ABILITY.CREATE_ABILITY:
      return slices.createAbility.success(state, action)
      /** -------------------------- delete ability -------------------------> **/
    case types.ABILITY.DELETE_ABILITY:
      return slices.deleteAbility.base(state, action)
    case types.SUCCESS.ABILITY.DELETE_ABILITY:
      return slices.deleteAbility.success(state, action)
    case types.ERRORS.ABILITY.DELETE_ABILITY:
      return slices.deleteAbility.error(state, action)
      /** -------------------------- update ability -------------------------> **/
    case types.ABILITY.UPDATE_ABILITY:
      return slices.updateAbility.base(state, action)
    case types.SUCCESS.ABILITY.UPDATE_ABILITY:
      return slices.updateAbility.success(state, action)
    case types.ERRORS.ABILITY.UPDATE_ABILITY:
      return slices.updateAbility.error(state, action)
      /** -------------------------- reset  -------------------------> **/
    case types.RESET:
      return initialState.ability
    default:
      return state
  }
}

export default ability