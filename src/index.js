import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router , withRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './redux/store/configureStore';

const WrappedApp = withRouter(App);
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <WrappedApp/>
      </Router>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
