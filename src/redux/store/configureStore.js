import {createStore , applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
import rootSaga from '../sagas/rootSaga'
import {logger} from 'redux-logger'
import {routerMiddleware, ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

//Creating history
export const history = createHistory()
//Creating Saga middleware
const sagaMiddleware = createSagaMiddleware()
//Creating middleware to dispatch navigation actions
const navMiddleware = routerMiddleware(history)

const configureStore = () => {
	return createStore(rootReducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
			applyMiddleware(
					navMiddleware,
					sagaMiddleware,
					logger
			)
	);
}
export const runSaga = () => sagaMiddleware.run(rootSaga)
export default configureStore