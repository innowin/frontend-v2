// @flow
import auth from './auth'
import common from './commonReducer/index'
import education from './education'
import exchanges from './exchange'
import identities from './identity'
import organization from './organization'
import param from './param'
import research from './research'
import skill from './skill'
import temp from './temp'
import toast from './toast'
import workExperience from './workExperience'
import modal from './modal'
import {intlReducer as intl} from './intl'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  auth,
  common,
  education,
  exchanges,
  identities,
  organization,
  param,
  research,
  skill,
  temp,
  toast,
  workExperience,
  modal,
  intl,
  router,
  form,
})

export default rootReducer