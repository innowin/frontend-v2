import React, {Component} from "react"
import PropTypes from "prop-types"
import AuthActions from "../../../redux/actions/authActions"
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import {BeatLoader} from "react-spinners"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {createUserOrgan, createUser} from "src/crud/user/user"
import {Field, reduxForm} from "redux-form"
import {getMessages} from "src/redux/selectors/translateSelector"
import {RadioButtonGroup} from "../../common/inputs/RadioButtonInput"
import {routerActions} from "react-router-redux"
import {validateSignUpForm, asyncValidate} from "./validations"


const SignUpForm = (props) => {
  const {signInIsLoading, handleSubmit, onSubmit, translator, error, submitFailed} = props
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signUp-form">
      <Field
        name="username"
        type="text"
        component={renderTextField}
        label={translator['Username']}
      />
      <Field name="email" type="email" component={renderTextField} label={translator['Email']}/>
      <Field name="password" type="password" component={renderTextField} label={translator['Password']}/>
      <Field name="passwordConfirm" type="password" component={renderTextField}
             label={translator['Repeat password']}/>
      <div>
        <button
          className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
          disabled={signInIsLoading}>
          {!signInIsLoading ? translator['Register'] : (
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
  static propTypes = {
    RedirectToHome: PropTypes.func.isRequired,
    signInIsLoading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      userType: USER_TYPES.PERSON,
      data: {},
    }
  }

  _typeHandler = (value) => {
    this.setState({...this.state, userType: value})
  }

  _onSubmitOrgan = (values) => {
    const {push, signIn, signInIsLoading} = this.props.actions
    signInIsLoading(true)
    const handleLogin = () => {
      signIn(values.username, values.password, false)
      push('/')
    }
    const handleError = res => {
      console.log("createUserOrgan error:", res)
      signInIsLoading(false)
    }
    createUserOrgan(values, handleLogin, handleError)
  }

  _onSubmitPerson = (values) => {
    const {push, signIn, signInIsLoading} = this.props.actions
    signInIsLoading(true)
    const handleLogin = () => {
      signIn(values.username, values.password, false)
      push('/')
    }
    const handleError = res => {
      console.log("createUser error:", res)
      signInIsLoading(false)
    }
    createUser(values, handleLogin, handleError)
  }

  render() {
    const {RedirectToHome, translator, signInIsLoading, ...reduxFormProps} = this.props
    console.log("sign in signInIsLoading", signInIsLoading)
    const {userType} = this.state
    const userTypeItems = [{value: USER_TYPES.PERSON, title: 'فرد'}, {value: USER_TYPES.ORGANIZATION, title: 'مجموعه'}]
    const onSubmitFunc = (userType === USER_TYPES.PERSON) ? (this._onSubmitPerson) : (this._onSubmitOrgan)
    return (
      <div className="signup-wrapper">
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
          RedirectToHome={RedirectToHome}
          signInIsLoading={signInIsLoading}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  translator: getMessages(state),
  signInIsLoading:state.auth.client.signInIsLoading
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signIn: AuthActions.signIn,
    signInIsLoading: AuthActions.signInIsLoading,
    push: routerActions.push
  }, dispatch)
})

RegisterForm = reduxForm({
  form: 'RegisterForm',
  validate: validateSignUpForm,
  asyncValidate: asyncValidate
})(RegisterForm)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
