import {combineReducers} from 'redux'
import auth from './auth'
import organization from './organization'
import {routerReducer} from 'react-router-redux'
import {intlReducer} from './intl'
import category from './commonReducer/category'
import product from './commonReducer/product'
import certificate from './commonReducer/certificate'
import file from './commonReducer/fileReducer'
import {reducer as formReducer} from 'redux-form'
import usersInfoList from "./user/usersInfoList"
import organsInfoList from "./organization/organsInfoList"

const commonReducers =  {
  category,
  product,
  certificate,
  file
}

const reducers = {
  auth,
  usersInfoList,
  organsInfoList,
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