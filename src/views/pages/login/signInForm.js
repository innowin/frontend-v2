/*global __*/
import React, {Component} from 'react'
import AuthActions from "src/redux/actions/authActions"
import client from "src/consts/client"
import ErrorMessage from "./ErrorMessage"
import {BeatLoader} from "react-spinners"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {routerActions} from "react-router-redux"


class SignInForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: '',
			error: null,
			rememberme: false,
			sending: false,
			isLoggedIn: props.isLoggedIn
		}
	}
	
	componentDidMount(){
		client.isAuthenticated() && (this.props.location.pathname === '/login') && this.props.actions.push(this._redirectPath())
	}
	
	componentDidUpdate() {
		const {push} = this.props.actions
		if (this.props.isLoggedIn) {
			push(this._redirectPath())
		}
	}
	
	_redirectPath = () => {
		const locationState = this.props.location.state
		const pathname = (locationState && locationState.state && locationState.state.pathname)
		return pathname || '/'
	}
	
	_handleError = (msg) => {
		this.setState({...this.state, error: true, message: msg, sending: false})
	}
	
	_handleCheckbox = () => {
		let checked = this.rememberme.checked
		this.setState({...this.state, rememberme: checked})
	}
	_handleClick = (e) => {
		e.preventDefault()
		const {signIn} = this.props.actions
		const username = this.username.value
		const password = this.password.value
		const {rememberme} = this.state
		if (username && username.length > 0 && password && password.length > 0) {
			this.setState({...this.state, sending: true, message: ''}, () => {
				signIn(username, password, rememberme)
			})
		} else {
			const message = __('Required fields should be filled')
			this._handleError(message)
		}
	}
	
	render() {
		const {error, message, rememberme, sending} = this.state
		return (
				<form action="#" className="sign-in-form">
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

const mapStateToProps = state => ({location: state.router.location, isLoggedIn: state.auth.client.isLoggedIn})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		signIn: AuthActions.signIn,
		push: routerActions.push
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)