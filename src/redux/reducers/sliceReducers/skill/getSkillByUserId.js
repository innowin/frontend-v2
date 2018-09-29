const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedSkill = {}
  data.forEach(skill => {
    const prevSkill = state.list[skill.id]
    indexedSkill[skill.id] = {...prevSkill, ...skill, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedSkill,
    }
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}