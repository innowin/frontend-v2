import {combineReducers} from 'redux'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import category from './commonReducer/category'
import product from './commonReducer/product/index'
import certificate from './commonReducer/certificate'
import file from './commonReducer/fileReducer'
import badges from "./commonReducer/badge"
import {reducer as formReducer} from 'redux-form'
import organs from "./organization/organs"
import users from "./user/users"
import hashTag from "./commonReducer/hashTag"
import location from './commonReducer/location'


const common = combineReducers({
    category,
    product,
    certificate,
    file,
    hashTag,
    location,
    badges
})

const reducers = {
    auth,
    users,
    organs,
    organization,
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