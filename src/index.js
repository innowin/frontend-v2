import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router , withRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const WrappedApp = withRouter(App)

ReactDOM.render(
    <Router>
      <WrappedApp/>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
