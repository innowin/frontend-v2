import {setDataByAction} from "./helpers";

const success = (state, action) => {
  const data = setDataByAction(action)
  const {list = {}} = state
  const oldObj = list[data.id] || {}
  return {
    ...state,
    list: {
      ...state.list,
      [data.id]: {...oldObj, ...data}
    }
  }
}

// const error = () => {
// }
//
// const base = () => {
// }

export default {
  success
}