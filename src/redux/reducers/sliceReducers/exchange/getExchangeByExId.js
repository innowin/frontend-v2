const SUCCESS = (state, action) => {
	const {data} = action.payload
	return {
		...state,
		list: {
			...state.list,
			[data.id]:{...data},
		}
	}
}

const ERROR = (state, action) => {

}

const BASE = (state, action) => {

}

const getExchangeByExId = {
  BASE,
  ERROR,
  SUCCESS
}

export default getExchangeByExId