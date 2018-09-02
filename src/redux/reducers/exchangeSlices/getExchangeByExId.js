const getExchangeByExId = (state, action) => {
	const {data} = action.payload
	console.log('arrived data is : ', data)
	return {
		...state,
		list: {
			...state.list,
			[data.id]:{...data},
		}
	}
}
export default getExchangeByExId