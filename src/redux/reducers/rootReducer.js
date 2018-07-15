import {combineReducers} from 'redux'
import test from './test'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import {reducer as formReducer} from 'redux-form'
import productReducer from './contributionReducer'

const reducers = {
	test,
	auth,
	organization
}


//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
	...reducers,
	intl: intlReducer,
	router: routerReducer,
	form: formReducer,
    productReducer,
})

export default rootReducer