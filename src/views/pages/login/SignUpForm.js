/*global __*/
import React, {Component} from "react"
import cookies from "browser-cookies"
import {ErrorCard} from "../../common/cards/ErrorCard"
import {FORM_ERROR , ALL} from "../../../consts/error-codes"
import {LoadingCard} from "../../common/cards/LoadingCard"
import {REST_REQUEST} from "src/consts/Events"
import {setID ,setTOKEN,saveData} from "src/consts/data"
import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"

export class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status : {
				usernameS : null,
				emailS: null,
				passwordS: null,
				passowrdConfirmS: null
			},
			credentials:{
				username:null,
				password:null
			},
			errors: null,
			success: false,
			sending: false,
			messages: {
				usernameMB: null,
				emailMB:null,
				passwordMB: null,
				passwordConfirmMB: null,
				formMB: null,
			}
		}
	}
	componentDidMount(){
		socket.on('USERNAME_check',(res)=>{
			console.log('res is ',res);
			const {status , messages} = this.state;
			if(res.length > 0){
				let message =  __('Username exists');
				const newStates = {...this.state, errors:true ,status:{ ...status,usernameS : 'error'}, messages:{...messages , usernameMB: message }};
				this.setState(newStates);
				return false;
			}
			let message =  __('Acceptable');
			const newStates = {...this.state , errors:false, status:{ ...status , usernameS : 'success'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
		});
		
		socket.on('CREATE_USER_RESULT', res => {
			console.log(res);
			this._handleSignIn();
		});
		
		socket.on("TOKEN_Result_2", res => {
			// this.setState({...this.state , isLoggedIn: true});
			const {RedirectToHome} = this.props;
			cookies.set('token',res.token);
			setTOKEN(res.token);
			setID(res.user.id.toString());
			saveData(res);
			//console.log(res);
			//console.log('all cookies are these : ',cookies.all(), 'and cookie is : ',cookies.get('token'));
			//console.log(this.form);
			this.form.reset();
			RedirectToHome();
		});
	}

	_handleSignIn = () => {
		const {credentials} = this.state;
		const {username , password} = credentials;
		console.log('username is :',username ,'  ',password);
		socket.emit( REST_REQUEST , {
			method: "post",
			url: url + "/api-token-auth/",
			result: "TOKEN_Result_2",
			data: {
				username,
				password
			}
		})
	};
	_sendingForm = () => {
		const username = this.username.value;
		const password = this.password.value;
		const email = this.email.value;
		this.setState({...this.state,credentials : {
			username,
			password
		}});
		socket.emit(REST_REQUEST , {
			method: 'post',
			url:`${url}/users/`,
			result: 'CREATE_USER_RESULT',
			data: {
				username,
				password,
				email
			}
		});
	};
	
	_handleSubmit = (e) => {
		e.preventDefault();
		const {messages} = this.state;
		const username = this.username.value;
		this._validateUsername(username);
		this._usernameVerification();
		this._validatePassword();
		this._validatePasswordConfirm();
		this._validateEmail();
		if (this.state.errors) {
			let message =  __('Fix the errors and retry');
			const newStates = {...this.state , messages:{...messages , formMB: message }};
			this.setState(newStates);
			return false
		}
		if (!this.state.errors) {
			let message =  __('');
			const newStates = {...this.state , messages:{...messages , formMB: message }};
			this.setState(newStates);
			this._sendingForm();
			return true
		}
		
		
		
	};
	
	_validateUsername = (username) => {
		const value = this.username.value;
		const {status , messages} = this.state;
		if (value.length === 0){
			let message =  __('Username is required');
			const newStates = {...this.state ,errors:true,status:{...status ,usernameS:'error'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
			return false;
		}
		if(value.length>0 && value.length<5){
			let message =  __('Username length should be greater than 4');
			const newStates = {...this.state , errors:true ,status:{...status ,usernameS:'error'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
			return false;
		}
		if (username === '') {
			let message =  __('Username is required');
			const newStates = {...this.state ,errors:true ,status:{...status ,usernameS:'error'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
			return false;
		}
		if(username.length>4) {
			this._usernameVerification();
			return false;
		}
		if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
			let message =  __('Invalid username');
			const newStates = {...this.state , errors:true , status: {...status , usernameS:'error'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
			return false
		}
		return false;
	};
	
	
	_usernameVerification =  () => {
		const value = this.username.value;
		const {status , messages} =this.state;
		if (value.length === 0){
			let message =  __('Username is required');
			const newStates = {...this.state ,errors:true ,status: {...status,usernameS:'error'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
			return false;
		}
		if(value.length>0 && value.length<5){
			let message =  __('Username length should be greater than 4');
			const newStates = {...this.state ,errors: true ,status: {...status,usernameS:'error'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
			return false;
		}
		if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(value)) {
			let message =  __('Invalid username');
			const newStates = {...this.state ,errors:true ,status: {...status,usernameS:'error'}, messages:{...messages , usernameMB: message }};
			this.setState(newStates);
			return false
		}
		socket.emit(REST_REQUEST ,{
			method : "get",
			url: `${url}/users/?username=${value}`,
			result: "USERNAME_check",
		})
	};
	
	_validateEmail = () => {
		const value = this.email.value;
		const {status , messages} = this.state;
		if (value.length === 0){
			let message =  __('Email is required');
			const newStates = {...this.state ,errors: true,status: {...status , emailS:'error'}, messages:{...messages , emailMB: message }};
			this.setState(newStates);
			return false;
		}
		if(value.length >0 && value.length < 5){
			let message =  __('Invalid email');
			const newStates = {...this.state ,errors: true ,status: {...status , emailS:'error'}, messages:{...messages , emailMB: message }};
			this.setState(newStates);
			return false;
		}
		if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
			//alert('email is false');
			let message = null;
			const newStates = {...this.state ,errors: false , status: {...status , emailS:'success'}, messages:{...messages , emailMB: message }};
			this.setState(newStates);
			return false
		}
		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
			//alert('email is false');
			const message = 'رایانامه وارد شده معتبر نمی باشد';
			const newStates = {...this.state ,errors: true ,status:{...status , emailS:'error'} ,messages:{...messages , emailMB: message }};
			this.setState(newStates);
			return false;
		}
		
		//alert('email is OK');
		const newStates = {...this.state , errors:false ,status:{...status,emailS:'success'}};
		this.setState(newStates);
		return true
		
	};
	
	_validatePassword = () => {
		const value = this.password.value;
		const {status,messages} = this.state;
		//using dot and 8 chars min 8 and max 32
		const level1 = new RegExp("^[\s\S]{8,32}$");
		//using dot and 8 chars min 8 and max 32
		const level = new RegExp("^[\s\S]{4,}$");
		//using visible chars and space chars
		const level2 = new RegExp('^[\x20-\x7E]+$');
		//using capital Chars
		const level3 = new RegExp('[A-Z]');
		//using small Chars
		const level4 = new RegExp('[a-z]');
		// number chars
		const level5 = new RegExp('[0-9]');
		// one or more special chars
		const level6 = new RegExp('[●!"#$%&\'()*+,\\-./:;<=>?@[\\\\\\]^_`{|}~]');
		// Disallow three or more sequential identical characters
		const level7 = new RegExp('([\\s\\S])\\1\\1\n');
		
		const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,64})");
		const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		if( level1.test(value) && level2.test(value) && level5.test(value) && level4.test(value) && level3.test(value) && level6.test(value)) {
			const message = 'سطح امنیت گذرواژه: عالی';
			const newState = {...this.state ,errors:false , status:{...status, passwordS:'strong'},messages:{...messages, passwordMB: message}};
			this.setState(newState);
			return false;
		}
		if(strongRegex.test(value)){
			const message = 'سطح امنیت گذرواژه: بسیار خوب';
			const newState = {...this.state ,errors: false, status:{...status, passwordS:'good'},messages:{...messages, passwordMB: message}};
			this.setState(newState);
			return false;
		}
		if(mediumRegex.test(value)){
			const message = 'سطح امنیت گذرواژه: خوب';
			const newState = {...this.state ,errors:false, status:{...status, passwordS:'medium'},messages:{...messages,passwordMB:message}};
			this.setState(newState);
			return false;
		}
		if(level.test(value) && !level1.test(value) && !level2.test(value) && !level3.test(value)){
			const message = 'سطح امنیت گذرواژه: متوسط';
			const newState = {...this.state ,errors:false, status:{...status, passwordS:'weak'},messages:{...messages,passwordMB:message}};
			this.setState(newState);
			return false;
		}
		if(!level.test(value) || level7.test(value)){
			const message = 'سطح امنیت گذرواژه:  ضعیف';
			const newState = {...this.state ,errors: true, status:{...status, passwordS:'tooWeak'},messages:{...messages,passwordMB:message}};
			this.setState(newState);
			return false;
		}
	};
	
	_validatePasswordConfirm = () => {
		const pass = this.password.value;
		const {status , messages} = this.state;
		const pass2 = this.passwordConfirm.value;
		if (pass !== pass2) {
			const message = 'تکرار گذرواژه با گذرواژه مطابقت ندارد';
			const newState = {...this.state ,errors: true, status:{...status, passwordConfirmS:'error'},messages:{...messages, passwordConfirmMB:message}};
			this.setState(newState);
			return false;
		} else {
			const message = '';
			const newState = {...this.state ,errors:false, status:{...status, passwordConfirmS:'success'},messages:{...messages, passwordConfirmMB:message}};
			this.setState(newState);
			return true;
		}
	};
	
	_verifyValue = (e) => {
		const name = e.target.name;
		if( name === 'username') {
			const value = this.username.value;
			//alert(value);
			this._validateUsername(value);
		}
		if( name === 'email') {
			const value = this.email.value;
			//alert(value);
			this._validateEmail(value);
		}
		if (name === 'password') {
			const value = this.password.value;
			//alert(value);
			this._validatePassword(value);
		}
		if (name === 'passwordConfirm') {
			const value = this.passwordConfirm.value;
			//alert(value);
			this._validatePasswordConfirm(value);
		}
	};
	render() {
		const successStyle = {border: '2px solid #92ef8d'};
		const errorStyle = {border: '2px solid #f3a9a9'};
		const strongStyle = {border: '2px solid #01a800'};
		const goodStyle = {border: '2px solid #28ef48'};
		const mediumStyle = {border: '2px solid #92ef8d'};
		const weakStyle = {border: '2px solid #dfeb9d'};
		const tooWeakStyle = {border: '2px solid #f3a9a9'};
		
		const { success, sending , messages,status} = this.state;
		const {usernameS,emailS,passwordS,passwordConfirmS} = status;
		const {usernameMB , emailMB , passwordMB , passwordConfirmMB,formMB} = messages;
		if (success) {
			return (
				<div className="alert alert-success">
					{__('Activation email sent to your email')}
					<button type="button" onClick={this.props.showLogin} className="btn btn-success btn-sm float-right">
						{__('Login')}
					</button>
				</div>
			)
		}
		return (
			<form ref={form =>{this.form = form}}>
				<input
					type="text"
					name="username"
					ref={username => {this.username = username}}
					onKeyUp={this._verifyValue}
					onBlur={this._usernameVerification}
					className="form-control form-control-lg"
					placeholder={__('Username')}
					style = { (usernameS === 'success') ? successStyle : (usernameS === 'error' ? errorStyle: {}) }
				/>
				<div className="messageBox usernameMB">{usernameMB}</div>
				<input
					type="email"
					name="email"
					ref={email => {this.email = email}}
					className="form-control form-control-lg"
					onBlur={this._verifyValue}
					placeholder={__('Email')}
					style = { (emailS === 'success') ? successStyle : (emailS === 'error' ? errorStyle: {}) }
				/>
				<div className="messageBox emailMB">{emailMB}</div>
				
				<input
					type="password"
					name="password"
					ref={password =>{this.password = password}}
					className="form-control form-control-lg"
					onKeyUp={this._verifyValue}
					placeholder={__('Password')}
					style={ (passwordS === 'tooWeak') ? tooWeakStyle : (passwordS === 'weak' ? weakStyle: ((passwordS === 'medium')? mediumStyle:((passwordS === 'good')?goodStyle:((passwordS === 'good')?strongStyle:{}))))}
				/>
				
				<div className="messageBox passwordMB" 	 >
					{passwordMB}
				</div>
				
				<input
					type="password"
					name="passwordConfirm"
					ref={ passwordConfirm => {this.passwordConfirm = passwordConfirm}}
					onKeyUp={this._verifyValue}
					className="form-control form-control-lg"
					placeholder={__('Repeat password')}
					style = { (passwordConfirmS === 'success') ? successStyle : (passwordConfirmS === 'error' ? errorStyle: {}) }
				/>
				
				<div className="messageBox passwordConfirmMB">{passwordConfirmMB}</div>


				{sending && <div className="text-muted">{__('Sending')}</div>}
				<button onClick={this._handleSubmit} className="btn btn-primary btn-block btn-lg">{__('Register')}</button>
				<div className="messageBox formMB" style={{color : 'crimson'}}>{formMB}</div>
			</form>
		)
	}
}


export default SignUpForm;
