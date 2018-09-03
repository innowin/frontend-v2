const SUCCESS = (state, action) => {
  const {data} = action.payload
  return {
    ...state,
    ...data
  }
}

const ERROR = (state, action) => {

}

const BASE = (state, action) => {

}

const getExchangeIdentities = {
  BASE,
  ERROR,
  SUCCESS
}

export default getExchangeIdentities