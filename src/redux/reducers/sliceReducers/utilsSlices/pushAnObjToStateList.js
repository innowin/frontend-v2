import {setDataByAction} from "./helpers";

const success = (state, action) => {
  const data = setDataByAction(action)
  console.log('--- slice >> success >> pushAnObj >> state is: ', state)
  console.log('--- slice >> success >> pushAnObj >> action is: ', action)
  console.log('--- slice >> success >> pushAnObj >> data is: ', data)
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