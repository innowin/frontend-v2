const success = (state, action) => {
  return {
    ...state,
    searchByWord: [],
    searchByHashTag: []
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success
}