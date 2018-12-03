const success = (state, action) => {
  const {id} = action.payload
  let temp = {...state}
  delete temp.list[id]
  return {
    ...temp,
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