const base = (state, action) => {
  const {educationId} = action.payload
  const prevEducation = state.list[educationId]
  return {
    ...state,
    list:{
      ...state.list,
      [educationId]: {...prevEducation, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {data, educationId} = action.payload
  const prevEducation = state.list[educationId]
  return {
    ...state,
    list:{
      ...state.list,
      [educationId]: {
        ...prevEducation,
        ...data,
        isLoading: false,
        error: null
      }
    }
  }
}

const error = (state, action) => {
  const {message, educationId} = action.payload
  const prevEducation = state.list[educationId]
  return {
    ...state,
    list:{
      ...state.list,
      [educationId]: {...prevEducation, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}