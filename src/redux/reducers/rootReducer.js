import {combineReducers} from 'redux'
import test from './testReducer'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from 'react-intl-redux'

const reducers = {
	test
}
const rootReducer = combineReducers({
	...reducers,
	intl: intlReducer,
	router: routerReducer
})

export default rootReducer