const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, data} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousEmployees = (state.list[organizationId] && state.list[organizationId].employees) || defaultObject2

  return {
    ...state,
    list:{
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        employees: {
          ...previousEmployees,
          content: [...previousEmployees.content, data.id],
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