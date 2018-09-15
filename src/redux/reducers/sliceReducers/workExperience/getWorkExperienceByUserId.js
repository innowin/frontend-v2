const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedWorkExperience = {}
  data.forEach(workExperience => {
    const prevPost = state.list[workExperience.id]
    indexedWorkExperience[workExperience.id] = {...prevPost, ...workExperience, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedWorkExperience,
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