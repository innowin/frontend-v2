const base = (state, action) => {
  return state
}

const success = (state, action) => {
  return {
    ...state,
    searchedOrganizations: {
      error: null,
      isLoading: false,
      content: {}
    }
  }
}

const error = (state, action) => {
  return state
}

export default {
  base,
  success,
  error,
}