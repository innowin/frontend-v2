import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AuthActions from 'src/redux/actions/authActions'
import CheckUsernameAction from 'src/redux/actions/user/checkUsernameAction'
import client from 'src/consts/client'
import {BeatLoader} from 'react-spinners'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {routerActions} from 'react-router-redux'
import {asyncValidateSignIn, validateSignInForm} from './signInValidations'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import renderTextField from 'src/views/common/inputs/reduxFormRenderTextField'
import {getMessages} from 'src/redux/selectors/translateSelector'
import FontAwesome from 'react-fontawesome'

class PureSignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
    }
  }

  _changeStatePassword = () => {
    this.setState({...this.state, showPassword: !this.state.showPassword})
  }

  render() {
    const {handleSubmit, onSubmit, submitting, translator, error, submitFailed, recoveryPasswordClick, onChangeSignIn} = this.props
    const {showPassword} = this.state
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
          <Field
              name="username"
              type="text"
              component={renderTextField}
              label={translator['Username']}
              className="signup-field"
              onChangeForm={onChangeSignIn}
          />
          <div className='password-container'>
            <FontAwesome className='eye-icon pulse' name={showPassword ? 'eye-slash' : 'eye'}
                         onClick={this._changeStatePassword}/>
            <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                component={renderTextField}
                label={translator['Password']}
                className="signup-field"
                onChangeForm={onChangeSignIn}
            />
          </div>
          <div className='sign-in-button-container'>
            <label className="container-checkmark">
              <input defaultChecked type="checkbox" name="rememberMe"/>
              <span className="checkmark"/>
              <p className='rememberme-text'>{translator['Remember me']}</p>
            </label>
            <button
                className="login-submit-button"
                disabled={submitting} type='submit'>
              {!submitting ? translator['Login'] : (
                  <BeatLoader color="#fff" size={10} margin="auto"/>
              )}
            </button>
          </div>
          {submitFailed && <p className="error-message mt-2">{error}</p>}
          <div className="remember-recovery">
            <span>{translator['Forgot Password']}</span>
            <span className='recovery-button pulse' onClick={recoveryPasswordClick}>{translator['Recovery']}</span>
          </div>
        </form>
    )
  }
}

class SignInForm extends Component {

  static propTypes = {
    translator: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    actions: PropTypes.object,
    recoveryPasswordClick: PropTypes.func.isRequired,
    onChangeSignIn: PropTypes.func.isRequired,
    inputValues: PropTypes.object,
  }

  componentDidMount() {
    client.isAuthenticated()
    && (this.props.location.pathname === '/login')
    && this.props.actions.push(this._redirectPath())
  }

  componentDidUpdate(prevProps) {
    const {push} = this.props.actions
    if (this.props.isLoggedIn && this.props.isLoggedIn !== prevProps.isLoggedIn) {
      push(this._redirectPath())
    }
  }

  _redirectPath = () => {
    const locationState = this.props.location.state
    const pathname = (locationState && locationState.state && locationState.state.pathname)
    return pathname || '/'
  }

  _onSubmit = (values) => {
    const {signIn} = this.props.actions
    const {translator} = this.props
    const promise = new Promise((resolve, reject) => signIn(values.username, values.password, values.rememberMe, reject))
    return promise
        .catch(
            (errorMessage) => {
              throw new SubmissionError({_error: translator[errorMessage]})
            }
        )
  }

  render() {
    const {translator, recoveryPasswordClick, onChangeSignIn, ...reduxFormProps} = this.props
    return (
        <PureSignInForm
            {...reduxFormProps}
            translator={translator}
            onSubmit={this._onSubmit}
            recoveryPasswordClick={recoveryPasswordClick}
            onChangeSignIn={onChangeSignIn}
        />
    )
  }
}

const mapStateToProps = state => ({
  translator: getMessages(state),
  location: state.router.location,
  isLoggedIn: state.auth.client.isLoggedIn
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signIn: AuthActions.signIn,
    checkUsername: CheckUsernameAction.checkUsername,
    push: routerActions.push
  }, dispatch)
})

SignInForm = reduxForm({
  form: 'SignInForm',
  validate: validateSignInForm,
  asyncValidate: asyncValidateSignIn,
  asyncBlurFields: ['username'],
  destroyOnUnmount: false
})(SignInForm)

SignInForm = connect(mapStateToProps, mapDispatchToProps)(SignInForm)

export default SignInForm