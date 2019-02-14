import React, {Component} from 'react'
import CarouselLogin from './login/Carousel'
import FooterLogin from './login/FooterLogin'
import HeaderLogin from './login/HeaderLogin'
import RegisterForm from './login/SignUpForm'
import SignInForm from './login/signInForm'
import PasswordRecovery from './login/PasswordRecovery'
import {getMessages} from '../../redux/selectors/translateSelector'
import connect from 'react-redux/es/connect/connect'
import constants from '../../consts/constants'
// import SocialLogin from './login/SocialLogin'
// import RegisterStepsModal from './login/registerModal/RegisterStepsModal'
// import GetUserData from '../user/getUserData/GetUserData'

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
      },
      showRecovery: false,
      showRegisterModal: false,
      signInFields: {
        username: '',
        password: ''
      },
      signUpFields: {
        username: '',
        password: '',
        email: '',
        userType: constants.USER_TYPES.PERSON
      }
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

  _onRegisterClick = () => {
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
    const {page, footer, header, showRecovery, /*showRegisterModal, */signUpFields} = this.state
    const {year} = footer
    const {iosLink, androidLink, address, phoneNumber} = header
    const SignIn = (page === 'SignIn')
    const SignUp = (page === 'SignUp')
    const animateFormClass = (SignIn) ? ('sign-in-form-animate') : ('sign-up-form-animate')

    return (
        <div className="login-page  full-page-wrapper">
          <div className={(showRecovery) ? 'makeDark' : 'makeDark-out'}
               onClick={this._hideModalClick}>
            {/*dark div*/}
          </div>
          <PasswordRecovery showRecovery={showRecovery} hideRecoveryClick={this._hideModalClick}
                            translate={translate}/>

          {/*<RegisterStepsModal showRegisterModal={showRegisterModal} hideRecoveryClick={this._hideModalClick}*/}
          {/*translate={translate}/>*/}

          {/*<GetUserData showRegisterModal={showRegisterModal}*/}
          {/*hideRegisterModal={this._hideModalClick}*/}
          {/*password={signUpFields.password}*/}
          {/*email={signUpFields.email}/>*/}

          <div className="login-container">
            <HeaderLogin onSignUpClick={this._showSignUp} translate={translate} iosLink={iosLink} androidLink={androidLink} address={address}
                         phoneNumber={phoneNumber}/>
            <div className="content">
              <div className={`login-wrapper ${animateFormClass}`}>
                <div className="sign-in-card">
                  <div className="login-tab">
                    <h2 className='login-part-title'>
                      {translate['Danesh Boom']}
                    </h2>
                    <div className='tabs-container'>
                      {(!SignIn) && (
                          <div className="signup-tab">
                            <span>{translate['Register']}</span>
                            <button className="login-signup-button pulse" onClick={this._showSignIn}>
                              {translate['Login']}
                            </button>
                          </div>
                      )}
                      {(SignIn) && (
                          <div className="signin-tab">
                            <button className="login-signup-button pulse" onClick={this._showSignUp}>
                              {translate['Register']}
                            </button>
                            <span>{translate['Login']}</span>
                          </div>
                      )}
                    </div>
                  </div>
                  <div className="login-form">
                    {SignIn &&
                    <SignInForm onChangeSignIn={this._onChangeSignIn} initialValues={{rememberMe: true}}
                                recoveryPasswordClick={this._showRecoveryPassword}
                    />}
                    {SignUp &&
                    <RegisterForm inputValues={signUpFields} onChangeSignUp={this._onChangeSignUp}
                                  onRegisterClick={this._onRegisterClick}
                    />}
                  </div>
                  {/*<div className="card-footer social-login">*/}
                  {/*<span>{translate['Register with other accounts']}</span>*/}
                  {/*<SocialLogin/>*/}
                  {/*</div>*/}
                </div>
              </div>

              <CarouselLogin/>
            </div>
            <FooterLogin year={year}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getMessages(state)
  }
}

export default connect(mapStateToProps)(Login)