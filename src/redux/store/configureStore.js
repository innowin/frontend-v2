import {createStore , applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
import rootSaga from '../sagas/rootSaga'
import {logger} from 'redux-logger'

//Creating Saga middleware
const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
	return createStore(rootReducer ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(sagaMiddleware,logger));
}
export const runSaga = () => sagaMiddleware.run(rootSaga)
export default configureStore