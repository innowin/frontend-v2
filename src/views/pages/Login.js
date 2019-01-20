import React, {Component} from 'react'
import CarouselLogin from './login/Carousel'
import FooterLogin from './login/FooterLogin'
import HeaderLogin from './login/HeaderLogin'
import RegisterForm from './login/SignUpForm'
import RegisterStepsModal from './login/registerModal/RegisterStepsModal'
import SignInForm from './login/signInForm'
// import SocialLogin from './login/SocialLogin'
import PasswordRecovery from './login/PasswordRecovery'
import {getMessages} from '../../redux/selectors/translateSelector'
import connect from 'react-redux/es/connect/connect'
import constants from '../../consts/constants'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'SignIn',
      footer: {year: '2018'},
      header: {
        iosLink: '#',
        androidLink: '#',
        address: 'انقلاب روبروی دانشگاه تهران مجتمع پارسا',
        phoneNumber: '02166972207',
        logoCaption: 'پنجره نوآوری'
      },
      showRecovery: false,
      showRegisterModal: false,
      signInFields: {
        username: '',
        password: '',
      },
      signUpFields: {
        username: '',
        password: '',
        email: '',
        userType: constants.USER_TYPES.PERSON,
      },
    }
  }

  _showSignIn = () => {
    this.setState({...this.state, page: 'SignIn'})
  }

  _showSignUp = () => {
    this.setState({...this.state, page: 'SignUp'})
  }

  _showRecoveryPassword = () => {
    this.setState({...this.state, showRecovery: true})
  }

  _hideModalClick = () => {
    this.setState({...this.state, showRecovery: false, showRegisterModal: false})
  }

  _onRegisterClisk = (value) => {
    this.setState({...this.state, showRegisterModal: true})
  }

  _onChangeSignIn = (event) => {
    const {signInFields} = this.state
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({...this.state, signInFields: {...signInFields, [name]: value}})
  }

  _onChangeSignUp = (event) => {
    const {signUpFields} = this.state
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({...this.state, signUpFields: {...signUpFields, [name]: value}})
  }

  render() {
    const {translate} = this.props
    const {page, footer, header, showRecovery, showRegisterModal, signUpFields} = this.state
    const {year} = footer
    const {iosLink, androidLink, address, phoneNumber, logoCaption} = header
    const SignIn = (page === 'SignIn')
    const SignUp = (page === 'SignUp')
    const animateFormClass = (SignIn) ? ('sign-in-form-animate') : ('sign-up-form-animate')

    return (
        <div className="login-page  full-page-wrapper">
          <div className={(showRecovery || showRegisterModal) ? 'makeDark' : 'makeDark-out'}
               onClick={this._hideModalClick}>
            {/*dark div*/}
          </div>
          <PasswordRecovery showRecovery={showRecovery} hideRecoveryClick={this._hideModalClick}
                            translate={translate}/>
          <RegisterStepsModal showRegisterModal={showRegisterModal} hideRecoveryClick={this._hideModalClick}
                              translate={translate}/>
          <div className="login-container">
            <HeaderLogin iosLink={iosLink} androidLink={androidLink} address={address} phoneNumber={phoneNumber}
                         logoCaption={logoCaption}/>
            <div className="row content mr-0" style={{direction: 'rtl'}}>

              <CarouselLogin/>

              <div className={`col-12 col-md-6 col-lg-5 login-wrapper ${animateFormClass}`}>
                <div className="sign-in-card">
                  <div className="login-tab">
                    {(!SignIn) && (
                        <div className="signup-tab">
                          <button className="btn btn-secondary" onClick={this._showSignIn}>
                            {translate['Login']}
                          </button>
                          <span>{translate['Register']}</span>
                        </div>
                    )}
                    {(SignIn) && (
                        <div className="signin-tab">
                          <span>{translate['Login']}</span>
                          <button className="btn btn-secondary" onClick={this._showSignUp}>
                            {translate['Register']}
                          </button>
                        </div>
                    )}
                  </div>
                  <div className="card-block login-form p-3">
                    {SignIn &&
                    <SignInForm onChangeSignIn={this._onChangeSignIn} initialValues={{rememberMe: true}}
                                recoveryPasswordClick={this._showRecoveryPassword}
                    />}
                    {SignUp &&
                    <RegisterForm inputValues={signUpFields} onChangeSignUp={this._onChangeSignUp} onRegisterClick={this._onRegisterClisk}
                    />}
                  </div>
                  {/*<div className="card-footer social-login">*/}
                  {/*<span>{translate['Register with other accounts']}</span>*/}
                  {/*<SocialLogin/>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
            <FooterLogin year={year}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state)
  }
}

export default connect(mapStateToProps)(Login)