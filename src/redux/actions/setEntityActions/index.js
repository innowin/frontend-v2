// @flow
import types from '../types'

const setEntityUser = (data:Object) => ({
	type: types.ENTITY.SET_USER,
	payload: {data}
})

const setFile = (data:Object) => ({
	type: types.ENTITY.SET_FILE,
	payload: {data}
})

export default {
	setEntityUser,
	setFile,
}