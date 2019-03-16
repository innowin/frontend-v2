import initialState from "./initialState"
import types from "../actions/types/index"

const modal = (state = initialState.modal, action) => {
  const {modalKey} = action.payload || ''

  switch (action.type) {
    case types.MODAL.HIDE_MODAL:
      return {
        ...state,
        [modalKey]: false
      }
    case types.MODAL.SHOW_MODAL:
      return {
        ...state,
        [modalKey]: true
      }
      /** -------------------------- reset users -------------------------> **/
    case types.RESET:
      return initialState.modal
    default:
      return state
  }
}

export default modal