import autoMerge from 'redux-persist/lib/stateReconciler/hardSet'
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

//Creating history
export const history = createHistory()
//Creating Saga middleware
const sagaMiddleware = createSagaMiddleware()
//Creating middleware to dispatch navigation actions
const navMiddleware = routerMiddleware(history)

const persistConfig = {
  key: 'root',
  storage,
  version: migrations.LATEST_VERSION,
  migrate: createMigrate(migrations.ROOT, {debug: false}),
  blacklist: ['form'],
  stateReconciler: autoMerge,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const applyMiddle = process.env.NODE_ENV !== 'production' ?
    applyMiddleware(navMiddleware, sagaMiddleware, gaMiddleware, createLogger({diff: true, collapsed: (getState, action, logEntry) => !logEntry.error}))
    :
    applyMiddleware(navMiddleware, sagaMiddleware, gaMiddleware)

const extension = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined

const configureStore = () =>
    createStore(
        persistedReducer,
        extension,
        applyMiddle,
    )

export const runSaga = () => sagaMiddleware.run(rootSaga)
export default configureStore