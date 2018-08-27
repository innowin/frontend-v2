import {combineReducers} from 'redux'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import {reducer as formReducer} from 'redux-form'
import organs from "./organization/organs"
import users from "./user/users"
import exchanges from "./exchange"
import common from "./commonReducer/index"

const reducers = {
    auth,
    users,
    organs,
    organization,
    exchanges,
    common
}

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
    ...reducers,
    intl: intlReducer,
    router: routerReducer,
    form: formReducer
})

export default rootReducer