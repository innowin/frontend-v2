import {setDataByAction} from "./helpers";

const success = (state, action) => {
  const {list} = state
  const data = setDataByAction(action)
  const {id} = data
  const newList = {
    ...list,
    [id]: {
      ...list[id],
      ...data
    }
  }
  return {
    ...state,
    list: newList,
  }
}

// const error = () => {}
//
// const base = () => {}

export default {
  success
}