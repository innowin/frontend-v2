import ability from './ability'
import auth from './auth'
import common from './commonReducer/index'
import customer from './customer'
import education from './education'
import event from './event'
import eventAssignment from './eventAssignment'
import exchanges from './exchange'
import favorite from './favorite'
import identities from './identity'
import organization from './organization'
import param from './param'
import research from './research'
import skill from './skill'
import temp from './temp'
import toast from './toast'
import workExperience from './workExperience'
import {combineReducers} from 'redux'
import {intlReducer} from './intl'
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import modal from './modal'

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
  ability,
  auth,
  common,
  customer,
  education,
  event,
  eventAssignment,
  exchanges,
  favorite,
  identities,
  organization,
  param,
  research,
  skill,
  temp,
  toast,
  workExperience,
  modal,
  intl: intlReducer,
  router: routerReducer,
  form: formReducer,
})

export default rootReducer