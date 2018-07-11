import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import {ConnectedRouter} from 'react-router-redux'
import {withRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import configureStore,{runSaga , history} from './redux/store/configureStore'
import {IntlProvider} from "react-intl-redux"

const WrappedApp = withRouter(App)
const store = configureStore()
runSaga()

ReactDOM.render(
    <Provider store={store}>
			<IntlProvider>
				<ConnectedRouter history={history}>
					<WrappedApp/>
				</ConnectedRouter>
			</IntlProvider>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
