import types from "./types"

const hideModal = ({modalKey}) => ({
  type: types.MODAL.HIDE_MODAL,
  payload: {modalKey}
})

const showModal = ({modalKey}) => ({
  type: types.MODAL.SHOW_MODAL,
  payload: {modalKey}
})

const ModalActions = {
  showModal,
  hideModal,
}

export default ModalActions