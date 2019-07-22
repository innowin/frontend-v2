import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import gaMiddleware from './gaMiddleware'
import rootReducer from '../reducers'
import rootSaga from '../sagas/rootSaga'
import storage from 'redux-persist/lib/storage'
import {createLogger} from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import {persistReducer} from 'redux-persist'
import {routerMiddleware} from 'react-router-redux'

//Creating history
export const history = createHistory()
//Creating Saga middleware
const sagaMiddleware = createSagaMiddleware()
//Creating middleware to dispatch navigation actions
const navMiddleware = routerMiddleware(history)

const persistedReducer = persistReducer({key: 'root', storage}, rootReducer)

const applyMiddle = process.env.NODE_ENV !== 'production' ?
    applyMiddleware(navMiddleware, sagaMiddleware, gaMiddleware, createLogger({diff: true, collapsed: (getState, action, logEntry) => !logEntry.error}))
    :
    applyMiddleware(navMiddleware, sagaMiddleware, gaMiddleware)

const extension = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined

const configureStore = () => createStore(persistedReducer, extension, applyMiddle)

export const runSaga = () => sagaMiddleware.run(rootSaga)
export default configureStore
