import React, {Component} from "react"
import AuthActions from "src/redux/actions/authActions"
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import CreateUserActions from "src/redux/actions/user/createUserActions"
import {BeatLoader} from "react-spinners"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Field, reduxForm, SubmissionError} from "redux-form"
import {getMessages} from "src/redux/selectors/translateSelector"
import {routerActions} from "react-router-redux"
import {validateSignUpForm, asyncValidateSignUp} from "./signUpValidations"
import CheckUsernameAction from "src/redux/actions/user/checkUsernameAction"
import CheckEmailAction from "src/redux/actions/user/checkEmailAction"
import FontAwesome from "react-fontawesome";


class SignUpForm extends React.Component<> {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    }
  }

  _changeStatePassword = () => {
    this.setState({...this.state, showPassword: !this.state.showPassword})
  }

  render() {
    const {handleSubmit, onSubmit, submitting, translator, error, submitFailed} = this.props
    const {showPassword} = this.state
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
          <Field
              name="username"
              type="text"
              component={renderTextField}
              label={translator['Username']}
              className="signup-field"
          />
          <Field name="email" type="email" component={renderTextField} label={translator['Email']}
                 className="signup-field"/>
          <div className='password-container'>
            <FontAwesome className='eye-icon pulse' name={showPassword ? 'eye-slash' : 'eye'}
                         onClick={this._changeStatePassword}/>
            <Field name="password" type={showPassword ? 'text' : 'password'} component={renderTextField}
                   label={translator['Password']}
                   className="signup-field"/>
          </div>
          {/*<Field name="passwordConfirm" type="password" component={renderTextField}*/}
          {/*label={translator['Repeat password']} className="signup-field"/>*/}
          <div>
            <button
                className="login-submit-button"
                disabled={submitting}>
              {!submitting ? translator['Register'] : (
                  <BeatLoader color="#fff" size={10} margin="auto"/>
              )}
            </button>
          </div>
          {submitFailed && <p className="error-message">{error}</p>}
        </form>
    )
  }
}

const USER_TYPES = {
  PERSON: 'person',
  ORGANIZATION: 'organization',
}

export class RegisterForm extends Component {

  constructor(props) {
    super(props)
    this.state = {userType: USER_TYPES.PERSON}
  }

  _typeHandler = (value) => {
    this.setState({...this.state, userType: value})
  }

  componentDidUpdate(prevProps) {
    const {push} = this.props.actions
    if (this.props.isLoggedIn && this.props.isLoggedIn !== prevProps.isLoggedIn) {
      push('/')
    }
  }

  _onSubmitOrgan = (values) => {
    const {signIn, createUserOrgan} = this.props.actions
    const {translator} = this.props
    const promise = new Promise((resolve, reject) => createUserOrgan(values, resolve, reject))
    return promise
        .then(
            (res) => {
              return new Promise((resolve, reject) => signIn(values.username, values.password, false, reject))
              //TODO mohsen: test return error in sign in
                  .catch((errorMessage) => {
                    throw new SubmissionError({_error: translator[errorMessage]})
                  })
            })
        .catch(
            (errorMessage) => {
              //TODO mohsen: test return error in SubmissionError
              throw new SubmissionError({_error: translator[errorMessage]})
            }
        )
  }

  _onSubmitPerson = (values) => {
    const {signIn, createUserPerson} = this.props.actions
    const {translator} = this.props
    const promise = new Promise((resolve, reject) => createUserPerson(values, resolve, reject))
    return promise
        .then(
            (res) => {
              return new Promise((resolve, reject) => signIn(values.username, values.password, false, reject))
                  .catch((errorMessage) => {
                    throw new SubmissionError({_error: translator[errorMessage]})
                  })
            })
        .catch(
            (errorMessage) => {
              throw new SubmissionError({_error: translator[errorMessage]})
            }
        )
  }

  render() {
    const {translator, onRegisterClick, ...reduxFormProps} = this.props
    const {userType} = this.state
    // const userTypeItems = [{value: USER_TYPES.PERSON, title: 'فرد'}, {value: USER_TYPES.ORGANIZATION, title: 'مجموعه'}]
    const onSubmitFunc = (userType === USER_TYPES.PERSON) ? (this._onSubmitPerson) : (this._onSubmitOrgan)
    // const onSubmitFunc = onRegisterClick
    return (
        <div className="">
          {/*<RadioButtonGroup*/}
          {/*selected={userType}*/}
          {/*handler={this._typeHandler}*/}
          {/*items={userTypeItems}*/}
          {/*name="userType"*/}
          {/*label={''}*/}
          {/*/>*/}
          <div className='radio-button-container'>
            <label className="container-checkmark">
              <input type="radio" defaultChecked name="radio-step-1" ref={e => this.emailChecked = e}
                     onClick={() => this._typeHandler(USER_TYPES.PERSON)}/>
              <span className="checkmark"/>
              <p className='title'>{translator['Person']}</p>
            </label>
            <label className="container-checkmark">
              <input type="radio" name="radio-step-1" ref={e => this.emailChecked = e}
                     onClick={() => this._typeHandler(USER_TYPES.ORGANIZATION)}/>
              <span className="checkmark"/>
              <p className='title'>{translator['Organ']}</p>
            </label>
          </div>

          <SignUpForm
              {...reduxFormProps}
              translator={translator}
              onSubmit={onSubmitFunc}
          />
          {/*<div className="error-wrapper">*/}
          {/*<span className={`error ${reduxFormProps.error ? 'show' : ''}`}>*/}
          {/*{reduxFormProps.error}*/}
          {/*</span>*/}
          {/*</div>*/}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  translator: getMessages(state),
  isLoggedIn: state.auth.client.isLoggedIn
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signIn: AuthActions.signIn,
    push: routerActions.push,
    createUserPerson: CreateUserActions.createUserPerson,
    createUserOrgan: CreateUserActions.createUserOrgan,
    checkUsername: CheckUsernameAction.checkUsername,
    checkEmail: CheckEmailAction.checkEmail
  }, dispatch)
})

RegisterForm = reduxForm({
  form: 'RegisterForm',
  validate: validateSignUpForm,
  asyncValidate: asyncValidateSignUp,
  asyncBlurFields: ['username', 'email']
})(RegisterForm)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
