import pushAnObjToStateList from './pushAnObjToStateList'
import {setDataByAction} from "./helpers";


const success = (state, action) => {
  const data = setDataByAction(action)
  const newStateWithNewObj = pushAnObjToStateList.success(state, action)
  newStateWithNewObj.nowCreatedId = data.id
  return newStateWithNewObj
}

const error = () => {}

const base = (state, action) => {
  return {
    ...state,
    nowCreatedId: null
  }
}

export default {
  success,
  error,
  base
}