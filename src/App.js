import React, {Component} from 'react';
import './fontawesome/css/font-awesome.min.css';
import './styles/global.scss';
import Layout from './views/Layout';
import Login from './views/pages/Login';
import {setTOKEN, setSession, setID, saveData , setIdentityId} from './consts/data';
import cookies from 'browser-cookies';
import PropsRoute from './consts/PropsRoute';
import Test from './views/Test';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {isLoggedIn: null}
	}
	
	_verifyToken = () => {
		//TODO: token should be verified with backend token
		
		return true;
	};
	
	_handleLogIn = (res , rememberme) => {
		// console.log('response is this : ',res);
		const setData = (data, cb) => {
			console.log('recieved data is' ,data);
			const {token} = data;
			const id = data.user.id.toString();
			saveData(data);
			rememberme ? setTOKEN(token) : setSession(token);
			setID(id);
			setIdentityId(data.identity.id);
			cb();
		};
		const redirectingToHome = () => {
			const T = cookies.get('token');
			if (T.length > 0) {
				this.props.history.push('/');
			}
		};
		setData(res, redirectingToHome);
	};
	
	_handleSignOut = () => {
		const allCookies = cookies.all();
		for (let cookieName in allCookies) {
			cookies.erase(cookieName);
		}
	};
	
	_isLoggedIn = () => {
		if (cookies.get('token') && this._verifyToken()) {
			return false
		}
		if (!cookies.get('token')) {
			if (this.props.location.pathname !== "/login") {
				this.props.history.push('/login');
			}
			return false
		}
	};
	
	render() {
		return (
				<div className="App">
					{this._isLoggedIn()}
					<PropsRoute path="/" component={Layout} handleSignOut={this._handleSignOut}/>
					<PropsRoute path="/login" component={Login} handleLogIn={this._handleLogIn}/>
					{/*<Test/>*/}
				</div>
		)
	}
}

export default App;
