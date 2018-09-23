const base = (state, action) => {
  const {userId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSkill = (state.list[userId] && state.list[userId].skills) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        skills: {
          ...previousSkill,
          isLoading: true,
          error: null
        }
      }
    }
  }
}

const success = (state, action) => {
  const {userId, data} = action.payload || {}

  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSkill = (state.list[userId] && state.list[userId].skills) || defaultObject2

  const arrayOfSkillId = data.map(skill => skill.id)
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        skills: {
          ...previousSkill,
          content: [...new Set([...previousSkill.content, ...arrayOfSkillId])],
          isLoading: false,
          error: null
        }
      }
    }
  }
}

const error = (state, action) => {
  const {userId, message} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSkill = (state.list[userId] && state.list[userId].skills) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        skills: {
          ...previousSkill,
          isLoading: false,
          error: message
        }
      }
    }
  }
}

export default {
  base,
  success,
  error,
}