// @flow
import types from '../types'

const setEntityUser = (data:Object) => ({
	type: types.ENTITY.SET_USER,
	payload: {data}
})
export default setEntityUser
