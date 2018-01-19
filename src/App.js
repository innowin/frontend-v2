import React, { Component } from 'react';
import './fontawesome/css/font-awesome.min.css';
import './styles/global.scss';
import Layout from './views/Layout';
import Login from './views/pages/Login';
import Test from './views/Test';
import {setTOKEN, setID,saveData} from './consts/data';
import cookies from 'browser-cookies';
import PropsRoute from './consts/PropsRoute';
import io from 'socket.io-client';
import {SOCKET_URL} from './consts/URLS';

const socket = io(SOCKET_URL);

class App extends Component {
	constructor (props){
		super(props);
		this.state = {isLoggedIn : null}
	}
	
	_verifyToken = () => {
		//TODO: token should be verified with backend token
		
		return true;
	};
	
	_handleLogIn = (res) => {
		const setData = (data , cb) => {
			const {token} = data;
			const id = data.user.id.toString();
			saveData(data);
			setTOKEN(token);
			setID(id);
			cb()
		};
		const redirectingToHome = () => {
			const T = cookies.get('token');
			if(T.length > 0) {
				this.props.history.push('/');
			}
		};
		setData(res , redirectingToHome);
	};
	
	_handleSignOut = () => {
		const allCookies = cookies.all();
		for (let cookieName in allCookies) {
			cookies.erase(cookieName);
		}
	};
	
	_isLoggedIn = () => {
		if(cookies.get('token') && this._verifyToken()) {
			return false
		}
		if(!cookies.get('token')) {
			if(this.props.location.pathname !== "/login" ){
				this.props.history.push('/login');
			}
			return false
		}
	};
	
  render() {
		return (
      <div className="App">
				{this._isLoggedIn()}
				<PropsRoute path="/" component={Layout} socket={socket} handleSignOut={this._handleSignOut}/>
				<PropsRoute path="/login" component={Login} socket={socket} handleLogIn={this._handleLogIn}/>
        {/*<Test socket={socket}/>*/}
			</div>
    )
  }
}

export default App;
