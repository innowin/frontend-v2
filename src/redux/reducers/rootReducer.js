import {combineReducers} from 'redux'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import formReducer from './preFormReducer'
import productReducer from './contributionReducer'
import common from './common'


const reducers = {
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
  common
})

export default rootReducer