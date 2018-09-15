import {setDataByAction} from "./helpers";

/**
 can use these slices when we fetch a list of data and we want to append the fetched data to
 correspond list in state.
 **/
const success = (state, action) => {
  const data = setDataByAction(action)
  return {
    ...state,
    list: {
      ...state.list,
      ...data
    }
  }
}

const error = (state, action) => {}

const base = (state, action) => {}

export default {
  success,
  // error,
  // base
}