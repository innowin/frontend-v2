import React, { Component } from 'react';
import './fontawesome/css/font-awesome.min.css';
import './styles/global.scss';
import Layout from './views/Layout';
import Login from './views/pages/Login';
import Test from './views/Test';
import {TOKEN} from './consts/data';
import {Route,Redirect} from 'react-router-dom';
import {REST_REQUEST, GET_VIEWS_COUNT} from './consts/Events';
import cookies from 'browser-cookies';
import PropsRoute from './consts/PropsRoute';
import io from 'socket.io-client';
import {SOCKET_URL} from './consts/URLS';

const socket = io(SOCKET_URL);

class App extends Component {
	constructor (props){
		super(props);
		this.state = {
			isLoggedIn : false,
		}
	}
	
	_verifyToken = () => {
		//TODO: token should be verified with backend token
		return true;
	};
	
	_handleLogIn = () => {
		this.setState({...this.state , isLoggedIn : true});
		//alert('inside handle login')
	};
	
	_handleSignOut = () => {
		const allCookies = cookies.all();
		for (let cookieName in allCookies) {
			cookies.erase(cookieName);
		}
		//alert('signed out');
		this.setState({...this.state , isLoggedIn: false});
		this.props.history.push('/login')
		//console.log('props in handle sign out ',JSON.stringify(this.props,null , 2));
	};
	
	_loggedIn = () => {
		// alert('inside logged in checker ',cookies.get('token'));
		if(cookies.get('token') && this._verifyToken()) {
			//console.log('in true :',TOKEN);
			return true;
		}
		if(!cookies.get('token')) {
			//alert('in false :',TOKEN);
			return false;
		}
	};
	
  render() {
		const {isLoggedIn} = this.state;
		return (
      <div className="App">
				{(isLoggedIn || this._loggedIn()) ? (<Redirect from="/login" to="/"/> ,console.log(this.props))  : (<Redirect to="/login"/>)}
        <PropsRoute path="/" component={Layout} socket={socket} handleSignOut={this._handleSignOut}/>
        <PropsRoute path="/login" component={Login} socket={socket} handleLogIn={this._handleLogIn}/>
        <Test socket={socket}/>
			</div>
    )
  }
}

export default App;
