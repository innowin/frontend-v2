/*global __*/
import React, {Component} from 'react'
import {REST_URL as url, SOCKET as socket} from 'src/consts/URLS'
import {REST_REQUEST} from 'src/consts/Events'
import {routerActions} from 'react-router-redux'
import client from 'src/consts/client'
import AuthActions from 'src/redux/actions/authActions'
import {bindActionCreators} from 'redux'
import ErrorMessage from './ErrorMessage'
import {BeatLoader} from 'react-spinners'
import {connect} from 'react-redux'

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			error: null,
			rememberme: null,
			sending: false
		}
	}
	
	componentDidMount() {
		console.log('props are : ', this.props);
		// const {handleLogIn} = this.props;
		// const {rememberme} = this.state;
		// socket.on("TOKEN_Result", async res => {
		//   if (res.non_field_errors) {
		//     // const message = res.non_field_errors[0];
		//     // TODO mohsen: error message is handle
		//     const message = __('Username or password is not correct')
		//     this._handleError(message);
		//     return false;
		//   }
		//   await handleLogIn(res, rememberme);
		//   this.setState({...this.state, sending: false})
		// });
	}
	
	_redirectPath = () => {
		const locationState = this.props.location.state;
		const pathname = (
				locationState && locationState.state && locationState.state.pathname
		);
		return pathname || '/';
	};
	
	_handleError = (msg) => {
		this.setState({...this.state, error: true, message: msg, sending: false});
		//TODO: showing error in form
	};
	
	_handleCheckbox = () => {
		let checked = this.rememberme.checked;
		this.setState({...this.state, rememberme: checked},);
	};
	
	_handleClick = (e) => {
		e.preventDefault();
		const {signIn ,push} = this.props.actions
		const username = this.username.value
		const password = this.password.value
		const {rememberme} = this.state;
		if (username && username.length > 0 && password && password.length > 0) {
			this.setState({...this.state, sending: true, message: ''}, async () => {
				signIn(username, password, rememberme);
				try {
					console.log(this.props)
					if(await client.isAuthenticated()) {
						alert('in true auth')
						const path = await this._redirectPath()
						alert(path)
						push(path)
					}
					alert('after if')
				} catch(e) {
					throw new Error(e)
				}
			})
		} else {
			const message = __('Required fields should be filled')
			this._handleError(message)
		}
	};
	
	render() {
		const {error, message, rememberme, sending} = this.state
		const {push} = this.props.actions
		return (
				<form action="#" className="sign-in-form">
					{(client.isAuthenticated()) &&(alert('Hi inside auth'))}}
					<div className="input-group-vertical">
						<input
								type="text"
								name="username"
								ref={username => {
									this.username = username
								}}
								className="form-control my-form-control-lg"
								placeholder={__('Username')}
						/>
						<input
								type="password"
								name="password"
								ref={password => {
									this.password = password
								}}
								className="form-control my-form-control-lg"
								placeholder={__('Password')}
						/>
					</div>
					<button onClick={this._handleClick}
									className="btn btn-primary btn-block login-submit-button cursor-pointer"
									disabled={sending}>
						{!sending ? (__('Login')) : (
								<BeatLoader color="#fff" size={10} margin="auto"/>
						)}
					</button>
					<ErrorMessage message={message} error={(error) ? error : ''}/>
					<div className="remember-recovery">
						<label htmlFor="rememberme" className="cursor-pointer">
							<input
									id="rememberme"
									type="checkbox"
									checked={rememberme}
									ref={rememberme => this.rememberme = rememberme}
									onChange={this._handleCheckbox}
							/>
							{__('Remember me')}
						</label>
						<span className="btn btn-link recovery-button">
            {__('Password recovery')}
          </span>
					</div>
				</form>
		)
	}
}

const mapStateToProps = state => ({location: state.router.location})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		signIn: AuthActions.signIn ,
		push: routerActions.push
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)