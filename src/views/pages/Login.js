/*global __*/
import React,{Component}  from "react"
import CarouselLogin from "./login/Carousel"
import FooterLogin from "./login/FooterLogin"
import HeaderLogin from "./login/HeaderLogin"
import LoginForm from "./login/signInForm"
import RecoveryForm from "./login/RecoveryForm"
import RegisterForm from "./login/SignUpForm"
import SocialLogin from "./login/SocialLogin"
import {SOCKET as socket} from "../../consts/URLS"

class Login extends Component {
	constructor (props) {
		super(props);
		this.state = {
			page: 'SignIn',
			footer: { year:'2018'},
			header: {
				iosLink:'#', androidLink: '#', address: 'انقلاب روبروی دانشگاه تهران مجتمع پارسا', phoneNumber: '02166972207',logoCaption:'اکوسیستم دانش بنیان'
			}
		}
	}
	
	_showSignIn = () => {
		const newState = {
			...this.state,
			page: 'SignIn'
		};
		this.setState(newState)
	};
	
	_showSignUp = () => {
		const newState = {
			...this.state,
			page: 'SignUp'
		};
		this.setState(newState)
	};
	_RedirectToHome = () => {
		const {history} = this.props;
		history.push('/');
	};
	
	_showRecovery = () => {
		const newState = {
			...this.state,
			page: 'Recovery'
		};
		this.setState(newState)
	};

	render() {
		const {page,footer,header} = this.state;
		const {year} = footer;
		const {iosLink, androidLink, address, phoneNumber, logoCaption} = header;
		const SignIn = (page === 'SignIn');
		const SignUp = (page === 'SignUp');
		const Recovery = (page === 'Recovery');
		const {handleLogIn } = this.props;
		const RedirectToHome = this._RedirectToHome;
		return (
				<div className="full-page-wrapper login-page">
					<div className="login-container">
						<HeaderLogin  iosLink={iosLink} androidLink={androidLink} address={address} phoneNumber={phoneNumber} logoCaption={logoCaption} />
						<div className="row content">
							<CarouselLogin />
							<div className="col-12 col-md-6 col-lg-5 mt-4 login-wrapper">
								<div className="card">
									<div className="login-tab">
										{(!SignIn) && (<div className="signup-tab"><button className="btn btn-sm btn-secondary" onClick={this._showSignIn}>
											{__('Login')}
										</button><span>{__('Register')}</span></div>)}
										{ (SignIn) && (<div className="signin-tab"><span>{__('Login')}</span><button className="btn btn-sm btn-secondary" onClick={this._showSignUp}>
											{__('Register')}
										</button></div>)}
									</div>
									<div className="card-block">
										{SignIn && <LoginForm showRecovery={this._showRecovery} socket={socket}  handleLogIn={handleLogIn}/>}
										{SignUp && <RegisterForm showLogin={this._showSignIn} socket={socket} RedirectToHome={RedirectToHome}/>}
										{Recovery && <RecoveryForm socket={socket}/>}
									</div>
									<div className="card-footer social-login">
										<span>{__('Register with other accounts')}</span>
										<SocialLogin />
									</div>
								</div>
							</div>
						</div>
						<FooterLogin year={year}/>
					</div>
				</div>
    )
  }
}

export default Login;