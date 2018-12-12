// @flow
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
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
import temp from "./temp"
import toast from './toast'

const reducers = {
  auth,
  identities,
  users,
  organs,
  organization,
  exchanges,
  common,
  workExperience,
  education,
  research,
  skill,
  param,
  temp,
  customer,
  ability,
  favorite,
  toast,
}

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
  ...reducers,
  intl: intlReducer,
  router: routerReducer,
  form: formReducer
})

export default rootReducer