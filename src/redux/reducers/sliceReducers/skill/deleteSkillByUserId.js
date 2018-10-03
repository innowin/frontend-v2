const base = (state, action) => {
  const {skillId} = action.payload
  const prevSkill = state.list[skillId]
  return {
    ...state,
    list:{
      ...state.list,
      [skillId]: {...prevSkill, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {skillId} = action.payload
  const {[`${skillId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
  }
}

const error = (state, action) => {
  const {message, skillId} = action.payload
  const prevSkill = state.list[skillId]
  return {
    ...state,
    list:{
      ...state.list,
      [skillId]: {...prevSkill, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}