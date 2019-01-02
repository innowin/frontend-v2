const base = (state, action) => {
}

const success = (state, action) => {
  const {data, userId} = action.payload || {}
  const {client} = state
  const previousSkill = (client && client.skills) || []

  data.map(skill => {
    if (userId === state.client.user.id && (!previousSkill.includes(skill.id))) {
      return previousSkill.push(skill.id)
    }
    return previousSkill
  })
  return {
    ...state,
    client: {
      ...client,
      // skills: [...previousSkill, ...arrayOfSkillId],
      skills: previousSkill,
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