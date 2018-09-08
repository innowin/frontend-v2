import {setDataByAction} from './helpers'


/** an utility func replace the list of state with the fetched data**/
const success = (state, action) => {
  const data = setDataByAction(action)
  return {
    list: data,
  }
}

const error = () => {
}

const base = () => {
}


export default {
  success
}