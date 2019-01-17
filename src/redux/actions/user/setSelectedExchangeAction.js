import types from "../types/index"

const setSelectedExchange = (exchangeId) => ({
  type: types.AUTH.SET_SELECTED_EXCHANGE,
  payload: {exchangeId}
})

const actions = {
  setSelectedExchange
}

export default actions