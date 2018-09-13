const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, data} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousEmployees = (state[organizationId] && state[organizationId].employees) || defaultObject2

  return {
    ...state,
    [organizationId]: {
      ...state[organizationId],
      employees: {
        ...previousEmployees,
        content: [...previousEmployees.content, data.id],
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