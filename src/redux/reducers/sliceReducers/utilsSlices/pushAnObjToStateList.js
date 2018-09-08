import {setDataByAction} from "./helpers";

const success = (state, action) => {
  const data = setDataByAction(action)
  return {
    ...state,
    list: {
      ...state.list,
      [data.id]: data
    }
  }
}

const error = () => {
}

const base = () => {
}

export default {
  success
}