import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/hardSet'
import createEncryptor from 'redux-persist-transform-encrypt'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import gaMiddleware from './gaMiddleware'
import migrations from 'src/redux/migrations'
import rootReducer from '../reducers'
import rootSaga from '../sagas/rootSaga'
import storage from 'redux-persist/lib/storage'
import {createLogger} from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import {persistReducer, createMigrate} from 'redux-persist'
import {routerMiddleware} from 'react-router-redux'

//creating logger
const logger = createLogger({
  diff: true,
  collapsed: (getState, action, logEntry) => !logEntry.error,
})
//Creating history
export const history = createHistory()
//Creating Saga middleware
const sagaMiddleware = createSagaMiddleware()
//Creating middleware to dispatch navigation actions
const navMiddleware = routerMiddleware(history)

const encryptor = createEncryptor({
  secretKey: 'root-secret-key-is:podifohgr903485kljdsjf88923.,sdf985rnhsdfh9823834;jjfddd',
  onError: (error) => {
    throw new Error(error)
  },
})

const persistConfig = {
  key: 'root',
  transforms: [encryptor],
  storage,
  version: migrations.LATEST_VERSION,
  migrate: createMigrate(migrations.ROOT, {debug: true}),
  blacklist: ['form', 'param', 'toast', 'temp'],
  stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
  return createStore(persistedReducer,
      process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
      applyMiddleware(
          navMiddleware,
          sagaMiddleware,
          gaMiddleware,
          logger,
      ),
  )
}
export const runSaga = () => sagaMiddleware.run(rootSaga)
export default configureStore