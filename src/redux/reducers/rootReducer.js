// @flow
import {combineReducers} from 'redux'
import {persistReducer} from "redux-persist";
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import storage from 'redux-persist/lib/storage'
import auth from './auth'
import identities from "./identity"
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
import param from './param'
import customer from './customer'
import ability from './ability'
import favorite from './favorite'
import createEncryptor from "redux-persist-transform-encrypt"

const commonEncryptor = createEncryptor({
  secretKey: 'common-secret-key-is:kjjjjsdfhhfflds;....fdsfhgfbhhbbbbddddddddddddddddu75',
  onError: (error) => {
    throw new Error(error)
  }
})

const commonPersistConfig = {key: 'common',transforms: [commonEncryptor], storage: storage,}

const reducers = {
  auth,
  identities,
  users,
  organs,
  organization,
  exchanges,
  common: persistReducer(commonPersistConfig, common),
  workExperience,
  education,
  research,
  skill,
  param,
  customer,
  ability,
  favorite,
}

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
  ...reducers,
  intl: intlReducer,
  router: routerReducer,
  form: formReducer
})

export default rootReducer