import React, {Component} from "react"
import AuthActions from "src/redux/actions/authActions"
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import UsersInfoActions from "src/redux/actions/user/usersInfoActions"
import {BeatLoader} from "react-spinners"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Field, reduxForm, SubmissionError} from "redux-form"
import {getMessages} from "src/redux/selectors/translateSelector"
import {RadioButtonGroup} from "../../common/inputs/RadioButtonInput"
import {routerActions} from "react-router-redux"
import {validateSignUpForm, asyncValidate} from "./signUpValidations"


const SignUpForm = (props) => {
  const {handleSubmit, onSubmit, submitting, translator, error, submitFailed} = props
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
      <Field name="password" type="password" component={renderTextField} label={translator['Password']}
             className="signup-field"/>
      <Field name="passwordConfirm" type="password" component={renderTextField}
             label={translator['Repeat password']} className="signup-field"/>
      <div>
        <button
          className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
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
    return new Promise((resolve, reject) => createUserOrgan(values, resolve, reject))
      .then(
        (res) => {
          alert("F")
          console.log(res)
          return new Promise((resolve, reject) => signIn(values.username, values.password, false, reject))
          //TODO mohsen: test return error in sign in
            .catch((errorMessage) => {
              throw new SubmissionError({_error: translator[errorMessage]})
            })
        }
      )
      .catch(
        (errorMessage) => {
          alert("E")
          console.log(errorMessage)
          //TODO mohsen: test return error in SubmissionError
          throw new SubmissionError({_error: translator[errorMessage]})
        }
      )
  }

  _onSubmitPerson = (values) => {
    const {signIn, createUserPerson} = this.props.actions
    const {translator} = this.props
    return new Promise((resolve, reject) => createUserPerson(values, resolve, reject))
      .then(
        (res) => {
          alert("F")
          console.log(res)
          return new Promise((resolve, reject) => signIn(values.username, values.password, false, reject))
            .catch((errorMessage) => {
              throw new SubmissionError({_error: translator[errorMessage]})
            })
        }
      )
      .catch(
        (errorMessage) => {
          alert("E")
          console.log(errorMessage)
          throw new SubmissionError({_error: translator[errorMessage]})
        }
      )
  }

  render() {
    const {translator, ...reduxFormProps} = this.props
    const {userType} = this.state
    const userTypeItems = [{value: USER_TYPES.PERSON, title: 'فرد'}, {value: USER_TYPES.ORGANIZATION, title: 'مجموعه'}]
    const onSubmitFunc = (userType === USER_TYPES.PERSON) ? (this._onSubmitPerson) : (this._onSubmitOrgan)
    return (
      <div className="wrapper-form">
        <RadioButtonGroup
          selected={userType}
          handler={this._typeHandler}
          items={userTypeItems}
          name="userType"
          label={''}
        />
        <SignUpForm
          {...reduxFormProps}
          translator={translator}
          onSubmit={onSubmitFunc}
        />
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
    createUserPerson: UsersInfoActions.createUserPerson,
    createUserOrgan: UsersInfoActions.createUserOrgan
  }, dispatch)
})

RegisterForm = reduxForm({
  form: 'RegisterForm',
  validate: validateSignUpForm,
  asyncValidate: asyncValidate
})(RegisterForm)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
