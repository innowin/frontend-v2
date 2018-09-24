const base = (state, action) => {
}

const success = (state, action) => {
  const {data, userId} = action.payload || {}
  const {client} = state
  const previousSkill = (client && client.skills) || []

  const arrayOfSkillId = []
  data.map(skill => {
    if (userId === state.client.user.id && (!previousSkill.includes(skill.id))) {
      return arrayOfSkillId.push(skill.id)
    }
    return arrayOfSkillId
  })
  return {
    ...state,
    client: {
      ...client,
      skills: [...previousSkill, ...arrayOfSkillId]
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