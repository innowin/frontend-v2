import types from './types'

const addToast = ({data}) => ({
  type: types.TOAST.ADD_TOAST,
  payload: {data}
})

const removeToast = ({id}) => ({
  type: types.TOAST.REMOVE_TOAST,
  payload: {id}
})

const getToasts = () => ({
  type: types.TOAST.GET_TOASTS,
  payload: {}
})

const ParamActions = {
  addToast,
  removeToast,
  getToasts,
}

export default ParamActions