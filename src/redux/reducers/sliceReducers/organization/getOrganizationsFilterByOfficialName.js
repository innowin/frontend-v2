const base = (state, action) => {
  return {
    ...state,
    searchedOrganizations:{
      ...state.searchedOrganizations,
      error: null,
      isLoading: true,
    }
  }
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedOrganization = {}
  const searchedOrganizations = state.searchedOrganizations
  data.forEach(organization => {
    const prevResearch = searchedOrganizations.content[organization.id]
    indexedOrganization[organization.id] = {...prevResearch, ...organization}
  })
  return {
    ...state,
    searchedOrganizations: {
      ...searchedOrganizations,
      error: null,
      isLoading: false,
      content: {
        ...indexedOrganization,
      }
    }
  }
}

const error = (state, action) => {
  const {message} = action.payload
  return {
    ...state,
    searchedOrganizations:{
      ...state.searchedOrganizations,
      error: message,
      isLoading: false,
    }
  }
}

export default {
  base,
  success,
  error,
}