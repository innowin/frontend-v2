import types from '../actions/types'
import initialState from './initialState'
import createAnObjSlices from './sliceReducers/utilsSlices/createAnObj'
import setRelatedObjIdForListItem from "./sliceReducers/utilsSlices/setRelatedObjIdForListItem";


const skill = (state=initialState.skills, action) => {
  switch (action.type) {
    case types.SKILL.CREATE_SKILL:
      return createAnObjSlices.base(state, action)
    case types.SUCCESS.SKILL.CREATE_SKILL:
      return createAnObjSlices.success(state, action)
    case types.SKILL.ADD_HASH_TAG_ID_TO_Skill:
      return setRelatedObjIdForListItem.success(state, action, 'hashTags')
    case types.RESET:
      return initialState.skills
    default:
      return state
  }
}
export default skill