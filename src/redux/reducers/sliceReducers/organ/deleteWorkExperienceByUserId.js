const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, workExperienceId} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousEmployee = (state[organizationId] && state[organizationId].employees) || defaultObject2

  const newDeletedEmployees = previousEmployee.content.filter(id => id !== workExperienceId);
  return {
    ...state,
    [organizationId]: {
      ...state[organizationId],
      employees: {
        ...previousEmployee,
        content: [...newDeletedEmployees],
        isLoading: false,
        error: null
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