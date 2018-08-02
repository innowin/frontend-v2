import React, {Component} from 'react'
import PropTypes from "prop-types"
import AuthActions from "src/redux/actions/authActions"
import UserActions from "src/redux/actions/user/userActions"
import client from "src/consts/client"
import {BeatLoader} from "react-spinners"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {routerActions} from "react-router-redux"
import {asyncValidateSignIn, validateSignInForm} from "./signInValidations"
import {Field, reduxForm} from "redux-form"
import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"
import {getMessages} from "src/redux/selectors/translateSelector"


const PureSignInForm = (props) => {
  const {signInIsLoading, handleSubmit, onSubmit, translator, error, signInError, submitFailed} = props
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
      <Field
        name="username"
        type="text"
        component={renderTextField}
        label={translator['Username']}
        className="signup-field"
      />
      <Field
        name="password"
        type="password"
        component={renderTextField}
        label={translator['Password']}
        className="signup-field"
      />
      <div>
        <button
          className="btn btn-primary btn-block login-submit-button cursor-pointer"
          disabled={signInIsLoading}>
          {!signInIsLoading ? translator['Login'] : (
            <BeatLoader color="#fff" size={10} margin="auto"/>
          )}
        </button>
      </div>
      {submitFailed && <p className="error-message">{error}</p>}
      {signInError.isError && <p className="error-message">{signInError.message}</p>}
      <div className="remember-recovery">
        <label htmlFor="rememberMe" className="cursor-pointer">
          <Field name="rememberMe" id="rememberMe" component="input" type="checkbox"/>
          {translator['Remember me']}
        </label>
        <span className="btn btn-link recovery-button">
            {translator['Password recovery']}
        </span>
      </div>
    </form>
  )
}

class SignInForm extends Component {

  static propTypes = {
    translator: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    signInIsLoading: PropTypes.bool.isRequired,
    signInError: PropTypes.object,
    actions: PropTypes.object,
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
    signIn(values.username, values.password, values.rememberMe)
  }

  render() {
    const {translator, signInIsLoading, signInError, ...reduxFormProps} = this.props
    return (
      <PureSignInForm
        {...reduxFormProps}
        translator={translator}
        onSubmit={this._onSubmit}
        signInIsLoading={signInIsLoading}
        signInError={signInError}
      />
    )
  }
}

const mapStateToProps = state => ({
  translator: getMessages(state),
  location: state.router.location,
  isLoggedIn: state.auth.client.isLoggedIn,
  signInIsLoading: state.auth.client.signInIsLoading,
  signInError: state.auth.client.error
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signIn: AuthActions.signIn,
    checkUsername: UserActions.checkUsername,
    push: routerActions.push
  }, dispatch)
})

SignInForm = reduxForm({
  form: 'SignInForm',
  validate: validateSignInForm,
  asyncValidate: asyncValidateSignIn
})(SignInForm)

SignInForm = connect(mapStateToProps, mapDispatchToProps)(SignInForm)

export default SignInForm