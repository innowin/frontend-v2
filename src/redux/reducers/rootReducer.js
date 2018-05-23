import {combineReducers} from 'redux'
import test from './testReducer'
import {routerReducer} from 'react-router-redux'

const reducers = {
	test
}
const rootReducer = combineReducers({
	...reducers,
	router: routerReducer
})

export default rootReducer