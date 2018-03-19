import {createStore , applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = () => createStore(rootReducer ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk,logger));
export default configureStore;