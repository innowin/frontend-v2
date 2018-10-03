const base = (state, action) => {
}

const success = (state, action) => {
  const {userId, skillId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousSkill = (state.list[userId] && state.list[userId].skills) || defaultObject2

  const newDeletedSkills = previousSkill.content.filter(id => id !== skillId);
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        skills: {
          ...previousSkill,
          content: [...newDeletedSkills],
          isLoading: false,
          error: null
        }
      }
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