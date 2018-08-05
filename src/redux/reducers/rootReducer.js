import {combineReducers} from 'redux'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import {reducer as formReducer} from 'redux-form';
import category from './commonReducer/category'
import product from './commonReducer/product'
import certificate from './commonReducer/certificate'
import file from './commonReducer/fileReducer'
import user from "./user"


const reducers = {
    auth,
    organization,
    user,
    category,
    product,
    certificate,
    file
}

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
    ...reducers,
    intl: intlReducer,
    router: routerReducer,
    form: formReducer
})

export default rootReducer