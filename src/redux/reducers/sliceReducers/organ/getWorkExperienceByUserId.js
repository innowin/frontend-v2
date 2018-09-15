const base = (state, action) => {
  const {data} = action.payload || {}
  let newState = {}
  for (let key in data){
    let workExperience = data[key]
    let organizationId = workExperience.work_experience_organization
    let defaultObject2 = { content: [], isLoading: false, error: null }
    let previousEmployees = (state[organizationId] && state[organizationId].employees) || defaultObject2
    let previousNewStateEmployees = (newState[organizationId] && newState[organizationId].employees) || defaultObject2

    newState = {
      ...newState,
      [organizationId]: {
        ...newState[organizationId],
        ...state[organizationId],
        employees: {
          ...previousEmployees,
          ...previousNewStateEmployees,
          isLoading: true,
          error: null
        }
      }
    }
  }
  return {
    ...state,
    ...newState,
  }
}

const success = (state, action) => {
  const {data} = action.payload || {}
  let newState = {}
  for (let key in data){
    let workExperience = data[key]
    let organizationId = workExperience.work_experience_organization
    let arrayOfEmployeeId = [workExperience.id]
    let defaultObject2 = { content: [], isLoading: false, error: null }
    let previousEmployees = (state[organizationId] && state[organizationId].employees) || defaultObject2
    let previousNewStateEmployees = (newState[organizationId] && newState[organizationId].employees) || defaultObject2

    newState = {
      ...newState,
      [organizationId]: {
        ...newState[organizationId],
        ...state[organizationId],
        employees: {
          ...previousEmployees,
          ...previousNewStateEmployees,
          content: [...new Set([...previousEmployees.content, ...previousNewStateEmployees.content, ...arrayOfEmployeeId])],
          isLoading: false,
          error: null
        }
      }
    }
  }
  return {
    ...state,
    ...newState,
  }
}

const error = (state, action) => {
  const {data, message} = action.payload || {}
  let newState = {}
  for (let key in data){
    let workExperience = data[key]
    let organizationId = workExperience.work_experience_organization
    let defaultObject2 = { content: [], isLoading: false, error: null }
    let previousEmployees = (state[organizationId] && state[organizationId].employees) || defaultObject2
    let previousNewStateEmployees = (newState[organizationId] && newState[organizationId].employees) || defaultObject2

    newState = {
      ...newState,
      [organizationId]: {
        ...newState[organizationId],
        ...state[organizationId],
        employees: {
          ...previousEmployees,
          ...previousNewStateEmployees,
          isLoading: true,
          error: message
        }
      }
    }
  }
  return {
    ...state,
    ...newState,
  }
}

export default {
  base,
  success,
  error,
}