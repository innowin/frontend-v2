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
import {intlReducer as intl} from './intl'
import {reducer as form} from 'redux-form'
import {routerReducer as router} from 'react-router-redux'
import modal from './modal'

// persist things
import migrations from 'src/redux/migrations'
import storage from 'redux-persist/lib/storage'
import autoMerge from 'redux-persist/lib/stateReconciler/hardSet'
import createEncryptor from 'redux-persist-transform-encrypt'
import {persistReducer, createMigrate} from 'redux-persist'

const persistAuth = {
  key: 'auth',
  transforms: [createEncryptor({secretKey: 'root-secret-key-is:podifohgr903485kljdsjf88923.,sdf985rnhsdfh9823834;jjfddd'})],
  storage,
}

const persistIdentities = {
  key: 'identities',
  transforms: [createEncryptor({secretKey: 'root-secret-key-is:podifohgr903485kljdsjf88923.,sdf985rnhsdfh9823834;jjfddd'})],
  storage,
  version: migrations.LATEST_VERSION,
  migrate: createMigrate(migrations.ROOT, {debug: false}),
  stateReconciler: autoMerge,
}

//Don't change below code ,  Put your reducer on the upper object.
const rootReducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  identities: persistReducer(persistIdentities, identities),
  intl,
  form,
  router,
  param,
  common,
  favorite,
  research,
  skill,
  ability,
  organization,
  temp,
  exchanges,
  event,
  eventAssignment,
  customer,
  education,
  workExperience,
  modal,
  toast,
})

export default rootReducer