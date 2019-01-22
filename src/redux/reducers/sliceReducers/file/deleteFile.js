const base = (state, action) => {
  const {fileId} = action.payload
  const prevFile = state.list[fileId]
  return {
    ...state,
    list:{
      ...state.list,
      [fileId]: {...prevFile, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {fileId} = action.payload
  const {[`${fileId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
  }
}

const error = (state, action) => {
  const {message, fileId} = action.payload
  const prevFile = state.list[fileId]
  return {
    ...state,
    list:{
      ...state.list,
      [fileId]: {...prevFile, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}