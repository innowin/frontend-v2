// @flow
import {combineReducers} from 'redux'
import {persistReducer} from "redux-persist";
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import storage from 'redux-persist/lib/storage'

import auth from './auth'
import common from "./commonReducer/index"
import exchanges from "./exchange"
import organization from './organization'
import organs from "./organ"
import users from "./user"
import workExperience from './workExperience'
import education from './education'
import {intlReducer} from './intl'
import research from './research'
import skill from './skill'

const commonPersistConfig = {key: 'common', storage: storage,}

const reducers = {
  auth,
  users,
  organs,
  organization,
  exchanges,
  common: persistReducer(commonPersistConfig, common),
  workExperience,
  education,
  research,
  skill,
}

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
  ...reducers,
  intl: intlReducer,
  router: routerReducer,
  form: formReducer
})

export default rootReducer