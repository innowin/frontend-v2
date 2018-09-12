const success = (state, action) => {
  const newCert = action.data
  return {
    ...state,
    list: {
      ...state.list,
      [newCert.id]: newCert
    }
  }
}

const error = (state, action) => {}

const base = (state, action) => {}

export default {
  success,
  error,
  base
}