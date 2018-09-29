const base = (state, action) => {
}

const success = (state, action) => {
  const {skillId} = action.payload || {}
  const {client} = state
  const previousSkillId = (client && client.skills) || []

  const newDeletedSkillId = previousSkillId.filter(id => id !== skillId);
  return {
    ...state,
    client: {
      ...client,
      skills: [...newDeletedSkillId]
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