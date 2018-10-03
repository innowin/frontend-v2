const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, workExperienceId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousEmployee = (state.list[organizationId] && state.list[organizationId].employees) || defaultObject2

  const newDeletedEmployees = previousEmployee.content.filter(id => id !== workExperienceId);
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        employees: {
          ...previousEmployee,
          content: [...newDeletedEmployees],
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