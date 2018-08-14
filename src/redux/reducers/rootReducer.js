import {combineReducers} from 'redux'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import category from './commonReducer/category'
import product from './commonReducer/product'
import certificate from './commonReducer/certificate'
import file from './commonReducer/fileReducer'
import badges from "./commonReducer/badge"
import {reducer as formReducer} from 'redux-form'
import usersInfo from "./user/usersInfo"
import organsInfo from "./organization/organsInfo"
import users from "./user/users"

const commonReducers =  {
  category,
  product,
  certificate,
  file,
  badges
}

const reducers = {
  auth,
  usersInfo,
  users,
  organsInfo,
  organization,
  common: combineReducers({...commonReducers})
}

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
  ...reducers,
  intl: intlReducer,
  router: routerReducer,
  form: formReducer
})

export default rootReducer