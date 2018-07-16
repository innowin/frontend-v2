import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import configureStore,{runSaga , history} from "./redux/store/configureStore"
import registerServiceWorker from "./registerServiceWorker"
import {ConnectedRouter} from "react-router-redux"
import {IntlProvider} from "react-intl-redux"
import {Provider} from "react-redux"
import {withRouter} from "react-router-dom"

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

    , document.getElementById('root'))
registerServiceWorker()
