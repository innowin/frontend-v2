import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
import rootSaga from '../sagas/rootSaga'
import {createLogger} from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import {persistReducer} from 'redux-persist'
import createHistory from 'history/createBrowserHistory'
import createEncryptor from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'

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
	secretKey: 'my-super-secret-key',
	onError: (error) => {
		throw new Error(error)
	}
})
const persistConfig = {key: 'root',transforms: [encryptor],storage, blacklist:['form', 'param']}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
	return createStore(persistedReducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
			applyMiddleware (
					navMiddleware,
					sagaMiddleware,
					logger
			)
	)
}
export const runSaga = () => sagaMiddleware.run(rootSaga)
export default configureStore