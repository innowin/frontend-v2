import types from './types'

const setParamUserId = ({id}) => ({
  type: types.PARAM.USER.SET_PARAM_USER_ID,
  payload: {id}
})

const removeParamUserId = () => ({
  type: types.PARAM.USER.REMOVE_PARAM_USER_ID,
  payload: {}
})

const setParamOrganId = ({id}) => ({
  type: types.PARAM.ORG.SET_PARAM_ORG_ID,
  payload: {id}
})

const removeParamOrganId = () => ({
  type: types.PARAM.ORG.REMOVE_PARAM_ORG_ID,
  payload: {}
})

const ParamActions = {
  setParamUserId,
  removeParamUserId,
  setParamOrganId,
  removeParamOrganId,
}

export default ParamActions