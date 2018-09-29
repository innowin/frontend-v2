import types from './types'

const setParamUserId = ({id}) => ({
  type: types.PARAM.SET_PARAM_USER_ID,
  payload: {id}
})

const removeParamUserId = () => ({
  type: types.PARAM.REMOVE_PARAM_USER_ID,
  payload: {}
})

const ParamActions = {
  setParamUserId,
  removeParamUserId,
}

export default ParamActions