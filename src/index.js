import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ConnectedRouter} from 'react-router-redux'
import {BrowserRouter as Router , withRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-intl-redux'
import configureStore,{runSaga , history} from './redux/store/configureStore';

const WrappedApp = withRouter(App);
const store = configureStore();
runSaga()

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <WrappedApp/>
      </ConnectedRouter>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
