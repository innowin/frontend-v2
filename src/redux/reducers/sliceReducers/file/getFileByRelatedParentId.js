const base = (state, action) => {
  return {...state}
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedFile = {}
  data.forEach(file => {
    const prevFile = state.list[file.id]
    indexedFile[file.id] = {...prevFile, ...file, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedFile,
    }
  }
}

const error = (state, action) => {
  return {...state}
}

export default {
  base,
  success,
  error,
}