import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import configureStore, {runSaga, history} from "./redux/store/configureStore"
import registerServiceWorker from "./registerServiceWorker"
import {ConnectedRouter} from "react-router-redux"
import {IntlProvider} from "react-intl-redux"
import {Provider} from "react-redux"
import {withRouter} from "react-router-dom"
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import detectUserAgent from 'src/helpers/detectUserAgent'
import init from 'src/consts/ga'

const WrappedApp = withRouter(App)
const store = configureStore()
export const persistor = persistStore(store)
// persistor.purge()
runSaga()
detectUserAgent()
//initializing google analytics
// init()

ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<IntlProvider>
					<ConnectedRouter history={history}>
						<WrappedApp/>
					</ConnectedRouter>
				</IntlProvider>
			</PersistGate>
		</Provider>
		
		, document.getElementById('root'))
registerServiceWorker()
