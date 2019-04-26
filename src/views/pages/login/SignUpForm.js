import React, {Component} from 'react'
import AuthActions from 'src/redux/actions/authActions'
import renderTextField from '../../common/inputs/reduxFormRenderTextField'
import CreateUserActions from 'src/redux/actions/user/createUserActions'
import {BeatLoader} from 'react-spinners'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {routerActions} from 'react-router-redux'
import {validateSignUpForm, asyncValidateSignUp} from './signUpValidations'
import CheckUsernameAction from 'src/redux/actions/user/checkUsernameAction'
import CheckEmailAction from 'src/redux/actions/user/checkEmailAction'
import FontAwesome from 'react-fontawesome'
import constants from 'src/consts/constants'
import numberCorrection from '../../../helpers/numberCorrection'


class SignUpForm extends React.Component<> {

  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      emailTextWidth: 0,
      emailSuggest: '',
    }
    this.emailList = [
      /* Default domains included */
      'gmail.com', 'aol.com', 'att.net', 'comcast.net', 'facebook.com', 'gmx.com', 'googlemail.com',
      'google.com', 'hotmail.com', 'hotmail.co.uk', 'mac.com', 'me.com', 'mail.com', 'msn.com',
      'live.com', 'sbcglobal.net', 'verizon.net', 'yahoo.com', 'yahoo.co.uk',

      /* Other global domains */
      'email.com', 'fastmail.fm', 'games.com' /* AOL */, 'gmx.net', 'hush.com', 'hushmail.com', 'icloud.com',
      'iname.com', 'inbox.com', 'lavabit.com', 'love.com' /* AOL */, 'outlook.com', 'pobox.com', 'protonmail.com',
      'rocketmail.com' /* Yahoo */, 'safe-mail.net', 'wow.com' /* AOL */, 'ygm.com' /* AOL */,
      'ymail.com' /* Yahoo */, 'zoho.com', 'yandex.com',

      /* United States ISP domains */
      'bellsouth.net', 'charter.net', 'cox.net', 'earthlink.net', 'juno.com',

      /* British ISP domains */
      'btinternet.com', 'virginmedia.com', 'blueyonder.co.uk', 'freeserve.co.uk', 'live.co.uk',
      'ntlworld.com', 'o2.co.uk', 'orange.net', 'sky.com', 'talktalk.co.uk', 'tiscali.co.uk',
      'virgin.net', 'wanadoo.co.uk', 'bt.com',

      /* Domains used in Asia */
      'sina.com', 'sina.cn', 'qq.com', 'naver.com', 'hanmail.net', 'daum.net', 'nate.com', 'yahoo.co.jp', 'yahoo.co.kr', 'yahoo.co.id', 'yahoo.co.in', 'yahoo.com.sg', 'yahoo.com.ph', '163.com', '126.com', 'aliyun.com', 'foxmail.com',

      /* French ISP domains */
      'hotmail.fr', 'live.fr', 'laposte.net', 'yahoo.fr', 'wanadoo.fr', 'orange.fr', 'gmx.fr', 'sfr.fr', 'neuf.fr', 'free.fr',

      /* German ISP domains */
      'gmx.de', 'hotmail.de', 'live.de', 'online.de', 't-online.de' /* T-Mobile */, 'web.de', 'yahoo.de',

      /* Italian ISP domains */
      'libero.it', 'virgilio.it', 'hotmail.it', 'aol.it', 'tiscali.it', 'alice.it', 'live.it', 'yahoo.it', 'email.it', 'tin.it', 'poste.it', 'teletu.it',

      /* Russian ISP domains */
      'mail.ru', 'rambler.ru', 'yandex.ru', 'ya.ru', 'list.ru',

      /* Belgian ISP domains */
      'hotmail.be', 'live.be', 'skynet.be', 'voo.be', 'tvcablenet.be', 'telenet.be',

      /* Argentinian ISP domains */
      'hotmail.com.ar', 'live.com.ar', 'yahoo.com.ar', 'fibertel.com.ar', 'speedy.com.ar', 'arnet.com.ar',

      /* Domains used in Mexico */
      'yahoo.com.mx', 'live.com.mx', 'hotmail.es', 'hotmail.com.mx', 'prodigy.net.mx',

      /* Domains used in Brazil */
      'yahoo.com.br', 'hotmail.com.br', 'outlook.com.br', 'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'itelefonica.com.br', 'r7.com', 'zipmail.com.br', 'globo.com', 'globomail.com', 'oi.com.br',
    ]
  }

  divAtRef: HTMLInputElement
  emailInputRef: HTMLInputElement
  passwordInputRef: HTMLInputElement

  _changeStatePassword = () => {
    this.setState({...this.state, showPassword: !this.state.showPassword})
  }

  _emailFieldChange = (event) => {
    const {onChangeSignUp} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : numberCorrection(target.value)
    const name = target.name

    this.divAtRef.innerText = this.emailInputRef.value
    this.setState({...this.state, emailTextWidth: this.divAtRef.clientWidth})

    if (name === 'email') {
      const spliceByAt = value.split('@')
      if (spliceByAt.length === 2) {
        for (let domain of this.emailList) {
          if (domain.startsWith(spliceByAt[1])) {
            this.setState({emailSuggest: domain.slice(spliceByAt[1].length, domain.length)})
            return
          }
        }
      }
    }
    this.setState({emailSuggest: ''})
    onChangeSignUp(event)
  }

  _tabKeyDownForEmail = (e) => {
    if (e.keyCode === 9) {
      const {onChangeSignUp} = this.props
      const {emailSuggest} = this.state
      e.preventDefault()
      this.emailInputRef.value = this.emailInputRef.value + emailSuggest
      this.setState({...this.state, emailSuggest: ''})
      onChangeSignUp({
        target: {
          type: 'text',
          value: this.emailInputRef.value,
          name: 'email',
        },
      })
      this.passwordInputRef.focus()
    }
  }

  render() {
    const {handleSubmit, onSubmit, submitting, translator, error, submitFailed, onChangeSignUp} = this.props
    const {showPassword, emailTextWidth, emailSuggest} = this.state
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
          <Field
              name="username"
              type="text"
              component={renderTextField}
              label={translator['Username']}
              className="signup-field"
              onChangeForm={onChangeSignUp}
          />
          <div className='email-container'>
            {emailSuggest && <span ref={e => this.spanRef = e} className='email-suggest'
                                   style={{left: `${emailTextWidth}px`}}>{emailSuggest}</span>}
            <Field name="email" type="text" component={renderTextField} label={translator['Email']}
                   className="signup-field"
                   onChangeForm={this._emailFieldChange}
                   myRef={e => this.emailInputRef = e}
                   myKeyDown={this._tabKeyDownForEmail}
            />
            <div ref={e => this.divAtRef = e} className='calculate-length-container'/>
          </div>
          <div className='password-container'>
            <FontAwesome className='eye-icon pulse' name={showPassword ? 'eye-slash' : 'eye'}
                         onClick={this._changeStatePassword}/>
            <Field name="password" type={showPassword ? 'text' : 'password'} component={renderTextField}
                   label={translator['Password']}
                   className="signup-field"
                   myRef={e => this.passwordInputRef = e}
                   onChangeForm={onChangeSignUp}/>
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

export class RegisterForm extends Component {

  constructor(props) {
    super(props)
    this.state = {userType: constants.USER_TYPES.USER}
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
    let checkedValues = {...values}
    checkedValues.username = numberCorrection(checkedValues.username)
    checkedValues.password = numberCorrection(checkedValues.password)
    checkedValues.email = numberCorrection(checkedValues.email)
    const promise = new Promise((resolve, reject) => createUserOrgan(checkedValues, resolve, reject))
    return promise
        .then(
            () => {
              return new Promise((resolve, reject) => signIn(numberCorrection(checkedValues.username), numberCorrection(checkedValues.password), false, reject))
              //TODO mohsen: check that correctly return error in sign in
                  .catch((errorMessage) => {
                    throw new SubmissionError({_error: translator[errorMessage]})
                  })
            })
        .catch(
            (errorMessage) => {
              //TODO mohsen: check that correctly return error in SubmissionError
              throw new SubmissionError({_error: translator[errorMessage]})
            },
        )
  }

  _onSubmitPerson = (values) => {
    const {signIn, createUserPerson} = this.props.actions
    const {translator} = this.props
    let checkedValues = {...values}
    checkedValues.username = numberCorrection(checkedValues.username)
    checkedValues.password = numberCorrection(checkedValues.password)
    checkedValues.email = numberCorrection(checkedValues.email)
    const promise = new Promise((resolve, reject) => createUserPerson(checkedValues, resolve, reject))
    return promise
        .then(
            () => {
              return new Promise((resolve, reject) => signIn(checkedValues.username, checkedValues.password, false, reject))
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
    const {translator, /*onRegisterClick,*/ onChangeSignUp, inputValues, ...reduxFormProps} = this.props
    const {userType} = this.state
    // const userTypeItems = [{value: constants.USER_TYPES.USER, title: 'فرد'}, {value: constants.USER_TYPES.ORG, title: 'مجموعه'}]
    const onSubmitFunc = (userType === constants.USER_TYPES.USER) ? (this._onSubmitPerson) : (this._onSubmitOrgan)
    // const onSubmitFunc = onRegisterClick todo Hoseyn
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
              <input type="radio" name="userType" value={constants.USER_TYPES.USER}
                     checked={inputValues.userType === constants.USER_TYPES.USER}
                     onClick={() => this._typeHandler(constants.USER_TYPES.USER)}
                     onChange={onChangeSignUp}/>
              <span className="checkmark"/>
              <p className='title'>{translator['Person']}</p>
            </label>
            <label className="container-checkmark">
              <input type="radio" name="userType" value={constants.USER_TYPES.ORG}
                     checked={inputValues.userType === constants.USER_TYPES.ORG}
                     onClick={() => this._typeHandler(constants.USER_TYPES.ORG)}
                     onChange={onChangeSignUp}/>
              <span className="checkmark"/>
              <p className='title'>{translator['Organ']}</p>
            </label>
          </div>

          <SignUpForm
              {...reduxFormProps}
              translator={translator}
              onSubmit={onSubmitFunc}
              onChangeSignUp={onChangeSignUp}
              inputValues={inputValues}
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
  isLoggedIn: state.auth.client.isLoggedIn,
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signIn: AuthActions.signIn,
    push: routerActions.push,
    createUserPerson: CreateUserActions.createUserPerson,
    createUserOrgan: CreateUserActions.createUserOrgan,
    checkUsername: CheckUsernameAction.checkUsername,
    checkEmail: CheckEmailAction.checkEmail,
  }, dispatch),
})

RegisterForm = reduxForm({
  form: 'RegisterForm',
  validate: validateSignUpForm,
  asyncValidate: asyncValidateSignUp,
  asyncBlurFields: ['username', 'email'],
  // asyncBlurFields: ['email'],
  destroyOnUnmount: false,
})(RegisterForm)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
