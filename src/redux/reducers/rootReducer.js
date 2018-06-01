import {combineReducers} from 'redux'
import test from './testReducer'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intlReducer'
import {reducer as formReducer} from 'redux-form'

const reducers = {
	test
}

const rootReducer = combineReducers({
	...reducers,
	intl: intlReducer,
	router: routerReducer,
	form: formReducer
})

export default rootReducer