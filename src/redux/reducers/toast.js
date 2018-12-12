import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/toast'

const toast = (state = initialState.toast, action) => {
  switch (action.type) {
      /** -------------------------- add toast -------------------------> **/
    case types.TOAST.ADD_TOAST:
      return slices.addToast.base(state, action)
      /** -------------------------- remove toast -------------------------> **/
    case types.TOAST.REMOVE_TOAST:
      return slices.removeToast.base(state, action)
      /** -------------------------- reset toast -------------------------> **/
    case types.RESET:
      return initialState.toast
    default:
      return state
  }
}

export default toast