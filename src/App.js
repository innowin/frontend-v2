import React, {Component} from 'react'
import 'src/fontawesome/css/font-awesome.min.css'
import 'src/styles/global.scss'
import Layout from 'src/views/Layout'
import Login from 'src/views/pages/Login'
import client from 'src/consts/client'
import {Switch} from 'react-router-dom'
import PropsRoute from 'src/consts/PropsRoute'

class App extends Component {
	
	render() {
		return (
				<div className="App">
					<Switch>
						<PropsRoute path="/login" component={Login}/>
						<Layout/>
						{/*<PrivateRoute path="/" component={Layout} />*/}
					</Switch>
				</div>
		)
	}
}

export default App;
