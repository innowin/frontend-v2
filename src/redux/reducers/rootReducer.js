import {combineReducers} from 'redux'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import {reducer as formReducer} from 'redux-form';
import productReducer from './contributionReducer'
import common from './common'
import user from "./user"


const reducers = {
  auth,
  user,
  common,
  organization,
  productReducer
}


//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
  ...reducers,
  intl: intlReducer,
  router: routerReducer,
  form: formReducer
})

export default rootReducer