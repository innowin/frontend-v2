import React, {Component} from 'react'
import PropTypes from "prop-types"
import AuthActions from "src/redux/actions/authActions"
import CheckUsernameAction from "src/redux/actions/user/checkUsernameAction"
import client from "src/consts/client"
import {BeatLoader} from "react-spinners"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {routerActions} from "react-router-redux"
import {asyncValidateSignIn, validateSignInForm} from "./signInValidations"
import {Field, reduxForm, SubmissionError} from "redux-form"
import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"
import {getMessages} from "src/redux/selectors/translateSelector"

const PureSignInForm = (props) => {
  const {handleSubmit, onSubmit, submitting, translator, error, submitFailed} = props
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
          disabled={submitting}>
          {!submitting ? translator['Login'] : (
            <BeatLoader color="#fff" size={10} margin="auto"/>
          )}
        </button>
      </div>
      {submitFailed && <p className="error-message mt-2">{error}</p>}
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
    const {translator, ...reduxFormProps} = this.props
    return (
      <PureSignInForm
        {...reduxFormProps}
        translator={translator}
        onSubmit={this._onSubmit}
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
  asyncBlurFields: ['username']
})(SignInForm)

SignInForm = connect(mapStateToProps, mapDispatchToProps)(SignInForm)

export default SignInForm