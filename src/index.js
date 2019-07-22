import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureStore, {runSaga, history} from './redux/store/configureStore'
import registerServiceWorker from './registerServiceWorker'
import {ConnectedRouter} from 'react-router-redux'
import {IntlProvider, addLocaleData} from 'react-intl'
import {Provider} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import init from 'src/consts/ga'
import faLocaleData from 'react-intl/locale-data/fa'
import clearData from './redux/store/clearData'

const WrappedApp = withRouter(App)
const store = configureStore()
export const persistor = persistStore(store)
// persistor.purge()
runSaga()
//initializing google analytics
init()
// add persian local data for react-intl
addLocaleData(faLocaleData)

clearData('version_1')

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProvider locale="fa">
          <ConnectedRouter history={history}>
            <WrappedApp/>
          </ConnectedRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>
    , document.getElementById('root'),
)

registerServiceWorker()
