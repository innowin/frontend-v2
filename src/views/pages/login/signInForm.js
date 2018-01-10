/*global __*/
import React, {Component} from 'react'
import {REST_URL as url} from '../../../consts/URLS'
import {REST_REQUEST} from '../../../consts/Events'
import {Redirect} from 'react-router-dom'
import {TOKEN,ALL_COOKIES ,setID,saveData, setTOKEN , deleteTOKEN } from 'src/consts/data'
import ErrorMessage from './ErrorMessage'
import cookies from 'browser-cookies'


export default class LoginForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false,
			message : '',
			error : null,
		}
	}

	componentDidMount() {
		const {socket , handleLogIn} = this.props;
		socket.on("TOKEN_Result",res => {
			console.log(res);
			if (res.non_field_errors) {
				const message = res.non_field_errors[0];
				this._handleError(message)
				return false;
			}
			if (res.password || res.username) {
				const message = "Fields should not be empty";
				this._handleClick(message)
			}
			//console.log(res);
			handleLogIn();
			this.setState({...this.state , isLoggedIn: true});
			cookies.set('token',res.token);
			setTOKEN(res.token);
			setID(res.user.id.toString());
			saveData(res);
			//console.log('all cookies are these : ',cookies.all(), 'and cookie is : ',cookies.get('token'))
		});
	}

	_handleError = ()=> {
		const message= 'نام کاربری یا پسورد صحیح نمیباشد';
		this.setState({...this.state , error: true , message: message });
		//TODO: showing error in form
	};

	_handleClick = (e)=> {
		e.preventDefault();
		const username = this.username.value;
		const password = this.password.value;
		const {socket} = this.props;
		if (username.length>4 && password.length>4) {
			socket.emit( REST_REQUEST , {
				method : "post",
				url: url+"/api-token-auth/",
				result: "TOKEN_Result",
				data: {
					username,
					password
				},
			});
		}
	};
	render() {
		const {isLoggedIn ,error , message} = this.state;
		return (
			<div>
				{ (isLoggedIn) ? <Redirect from="/login" to='/' /> : '' }
				<form action="#" >
					<div className="input-group-vertical mb-3">
						<input
								type="text"
								name="username"
								ref={username => { this.username = username }}
								className="form-control form-control-lg"
								placeholder={__('Username')}
						/>
						<input
								type="password"
								name="password"
								ref={password => { this.password = password }}
								className="form-control form-control-lg"
								placeholder={__('Password')}
						/>
					</div>
					<button onClick={this._handleClick} className="btn btn-primary btn-block btn-lg">{__('Login')}</button>
					<ErrorMessage message={message} error={(error)? error : ''}/>
					<button type="button"  className="btn btn-link">
						{__('Password recovery')}
					</button>
				</form>
			</div>

		)
	}
}