// @flow
import * as React from "react"
import {Fragment} from 'react'
import FontAwesome from "react-fontawesome";
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import ResetPassword from "src/redux/actions/user/resetPasswordBySmsActions"
import {recoveryPasswordSelector} from "src/redux/selectors/user/recoveryPasswordSelector"
import PropTypes from 'prop-types'

type passwordRecoveryProps = {
  showRecovery: boolean,
  hideRecoveryClick: Function,
  translate: { [string]: string },
  actions: {
    resetPasswordBySmsRequest: Function,
    resetPasswordBySmsCheckCode: Function,
    resetPasswordBySms: Function,
    resetRecoveryPasswordReduxState: Function,
    searchUser: Function,
  },
  recoveryPasswordObject: {
    userId: ?number,
    VerificationCode: ?number,
    step_name: string,
    isLoading: boolean,
    error: ?string,
    searchUserData: {
      id: number,
      mobile: string,
      email: string,
      username: string,
    }
  }
}

type passwordRecoveryStates = {
  step: number,
  showPassword: boolean,
  showRepeatPassword: boolean,
  userIdentifierInputValue: ?string,
  onSuccessDisabled: boolean,
  password: string,
  passwordConfirm: string,
}

class PasswordRecovery extends React.Component <passwordRecoveryProps, passwordRecoveryStates> {
  constructor(props: passwordRecoveryProps) {
    super(props)
    this.state = {
      step: 0,
      showPassword: false,
      showRepeatPassword: false,
      userIdentifierInputValue: '',
      onSuccessDisabled: true,
      password: '',
      passwordConfirm: '',
    }
  }

  userIdentifier: ?HTMLInputElement
  emailChecked: ?HTMLInputElement
  phoneChecked: ?HTMLInputElement
  activationCode1: ? HTMLInputElement
  activationCode2: ? HTMLInputElement
  activationCode3: ? HTMLInputElement
  activationCode4: ? HTMLInputElement
  activationCode5: ? HTMLInputElement
  password: ? HTMLInputElement
  passwordConfirm: ?HTMLInputElement

  componentDidUpdate(prevProps: passwordRecoveryProps) {
    const {showRecovery, actions} = this.props
    const {resetRecoveryPasswordReduxState} = actions
    if (prevProps.showRecovery !== showRecovery) {
      showRecovery ? this.setState({...this.state, step: 0}) : resetRecoveryPasswordReduxState()
    }
  }

  changeStatePassword = () => {
    this.setState({...this.state, showPassword: !this.state.showPassword})
  }

  changeStateRepeatPassword = () => {
    this.setState({...this.state, showRepeatPassword: !this.state.showRepeatPassword})
  }

  onBack = () => {
    const {step} = this.state

    if (step >= 1) {
      this.setState({...this.state, step: step - 1})
    }
  }

  onSuccess = () => {
    const {hideRecoveryClick, actions, recoveryPasswordObject} = this.props
    const {resetPasswordBySmsRequest, resetPasswordBySmsCheckCode, resetPasswordBySms, searchUser} = actions
    const {userId, VerificationCode, isLoading: recoveryIsloading, error: recoveryError, searchUserData} = recoveryPasswordObject
    const {step, userIdentifierInputValue} = this.state
    if (step === 0) {
      searchUser({input: userIdentifierInputValue})
      this.setState({...this.state, step: step + 1})
    }
    if (step === 1) {
      const emailChecked = this.emailChecked ? this.emailChecked.checked : false
      const phoneChecked = this.phoneChecked ? this.phoneChecked.checked : false
      userIdentifierInputValue && phoneChecked && !emailChecked ?
          // resetPasswordBySmsRequest(searchUserData.mobile)
          resetPasswordBySmsRequest(userIdentifierInputValue)
          : alert("قسمت ایمیل غیر فعال هست!")
      this.setState({...this.state, step: step + 1})
    } else if (step === 2) {
      const code1 = this.activationCode1 ? this.activationCode1.value : ''
      const code2 = this.activationCode2 ? this.activationCode2.value : ''
      const code3 = this.activationCode3 ? this.activationCode3.value : ''
      const code4 = this.activationCode4 ? this.activationCode4.value : ''
      const code5 = this.activationCode5 ? this.activationCode5.value : ''
      const activationCode = code1 + code2 + code3 + code4 + code5
      ;(activationCode.length === 5 && userId)
          ? resetPasswordBySmsCheckCode(userId, activationCode)
          : alert("کد وارد شده اشتباه می باشد!")
      this.setState({...this.state, step: step + 1})
    } else if (step === 3) {
      // const password = this.password ? this.password.value : false
      // const passwordConfirm = this.passwordConfirm ? this.passwordConfirm.value : false
      // if (password && (password === passwordConfirm)) {
      //   resetPasswordBySms(userId, VerificationCode, password, passwordConfirm)
      //   hideRecoveryClick()
      // } else {
      //   alert("دو پسوورد یکی نیستند!")
      // }

      const {password, passwordConfirm} = this.state
      if (password !== '' && (password === passwordConfirm)) {
        resetPasswordBySms(userId, VerificationCode, password, passwordConfirm)
        hideRecoveryClick()
      } else {
        alert("دو پسوورد یکی نیستند!")
      }
    }
  }

  _changePhoneInput = (e) => {
    // const {userIdentifierInputValue} = this.state
    // const phoneRegex = new RegExp("^09\\d{9}$")
    // if (value) {
    //   if (englishCharacter.test(value)) {
    //     const disabled = !(phoneRegex.test(value))
    //     this.setState({...this.state, userIdentifierInputValue: value, onSuccessDisabled: disabled})
    //   } else this.setState({...this.state, userIdentifierInputValue})
    // } else this.setState({...this.state, userIdentifierInputValue: ''})
    // const englishCharacter = new RegExp("^[A-Za-z0-9@_+$.#-]+$")
    const value = e.target.value
    if (value) {
      this.setState({...this.state, userIdentifierInputValue: value, onSuccessDisabled: false})
    } else {
      this.setState({...this.state, userIdentifierInputValue: value, onSuccessDisabled: true})
    }
  }

  _changeActiveCodeInput = (e) => {
    e.preventDefault()
    const value = e.target.value
    let element = e.target
    const myLength = value.length
    if (myLength > 0) {
      element.previousElementSibling.focus()
    }
  }

  _changePassword = (element) => {
    this.setState({...this.state, password: element.target.value})
  }
  _changePasswordConfirm = (element) => {
    this.setState({...this.state, passwordConfirm: element.target.value})
  }

  render() {
    const {showRecovery, translate, recoveryPasswordObject} = this.props
    const {step, showPassword, showRepeatPassword, onSuccessDisabled, userIdentifierInputValue, password, passwordConfirm} = this.state

    return (
        <div>
          <div className={showRecovery ? "common-modal password-modal" : "common-modal-out password-modal"}>
            <div className='password-modal-header'>
              {translate['Forgot password']}
            </div>
            <div className='password-modal-content'>
              {step === 0 &&
              <Fragment>
                <p className='password-modal-title'>{translate['Insert username or email or phone']}</p>
                <input
                    className='settingModal-menu-general-input user-identifier-input'
                    placeholder={translate['Username, email, phone']}
                    value={userIdentifierInputValue}
                    onChange={this._changePhoneInput}
                    ref={e => this.userIdentifier = e}
                />
              </Fragment>
              }
              {step === 1 &&
              <Fragment>
                {recoveryPasswordObject.error
                    ? <span className="error-message mt-2">کاربری یافت نشد!</span>
                    : <Fragment>
                      <p className='password-modal-title'>{translate['Pick a way for creating new password']}</p>
                      {recoveryPasswordObject.searchUserData.mobile &&
                      <label className="container">
                        <input type="radio" defaultChecked name="radio-step-1" ref={e => this.phoneChecked = e}/>
                        <span className="checkmark"/>
                        <p className='password-way-text'>
                          {translate['Send verification code to phone'] + ' ' + recoveryPasswordObject.searchUserData.mobile}
                        </p>
                      </label>
                      }
                      {recoveryPasswordObject.searchUserData.email &&
                      <label className="container">
                        <input type="radio" name="radio-step-1" ref={e => this.emailChecked = e}/>
                        <span className="checkmark"/>
                        <p className='password-way-text'>{translate['Send recovery link to'] +
                        recoveryPasswordObject.searchUserData.email}</p>
                      </label>
                      }
                    </Fragment>
                }
              </Fragment>
              }
              {step === 2 &&
              <Fragment>
                <p className='password-modal-title'>{translate['Enter the activation code']}</p>
                <span className='activation-text'>{translate['Activation code']}</span>
                <input tabIndex='5' className='settingModal-menu-general-input activation-input'
                       maxLength={1}
                       ref={e => this.activationCode5 = e}
                       onChange={this._changeActiveCodeInput}
                />
                <input tabIndex='4' className='settingModal-menu-general-input activation-input'
                       maxLength={1}
                       ref={e => this.activationCode4 = e}
                       onChange={this._changeActiveCodeInput}
                />
                <input tabIndex='3' className='settingModal-menu-general-input activation-input'
                       maxLength={1}
                       ref={e => this.activationCode3 = e}
                       onChange={this._changeActiveCodeInput}
                />
                <input tabIndex='2' className='settingModal-menu-general-input activation-input'
                       maxLength={1}
                       ref={e => this.activationCode2 = e}
                       onChange={this._changeActiveCodeInput}
                />
                <input tabIndex='1' className='settingModal-menu-general-input activation-input'
                       maxLength={1}
                       ref={e => this.activationCode1 = e}
                       onChange={this._changeActiveCodeInput}
                />
                {recoveryPasswordObject.error && <span className="error-message mt-2">کد وارد شده صحیح نمی باشد!</span>}
              </Fragment>
              }
              {step === 3 &&
              <Fragment>
                <p className='password-modal-title'>{translate['Select a new password']}</p>
                <div className='password-step-container'>
                  <span className='activation-text password-text'>{translate['Password']}</span>
                  <div className='password-input-container'>
                    <FontAwesome className='eye-icon pulse' name={showPassword ? 'eye-slash' : 'eye'}
                                 onClick={this.changeStatePassword}/>
                    <input type={showPassword ? 'text' : 'password'}
                           className='password-text-field settingModal-menu-general-input-password'
                           ref={e => this.password = e}
                           onChange={this._changePassword}
                    />
                  </div>
                </div>
                <div className='password-step-container'>
                  <span className='activation-text password-text'>{translate['Repeat password']}</span>
                  <div className='password-input-container'>
                    <FontAwesome className='eye-icon pulse' name={showRepeatPassword ? 'eye-slash' : 'eye'}
                                 onClick={this.changeStateRepeatPassword}/>
                    <input type={showRepeatPassword ? 'text' : 'password'}
                           className='password-text-field settingModal-menu-general-input-password'
                           ref={e => this.passwordConfirm = e}
                           onChange={this._changePasswordConfirm}
                    />
                  </div>
                  {passwordConfirm !== password &&
                  <span className='password-error'>{translate['Password not equal to repeated']}</span>
                  }
                </div>
                <p className='password-modal-title password-modal-text'>{translate['Select a hard password']}</p>
              </Fragment>
              }
            </div>
            <div className='password-modal-footer'>
              <button className='common-modal-button search-button' disabled={onSuccessDisabled}
                      onClick={this.onSuccess}>
                {step === 0 &&
                translate['search']
                }
                {(step === 1 || step === 2) &&
                translate['Continue']
                }
                {step === 3 &&
                translate['Save']
                }
              </button>
              {step !== 0 &&
              <button className='common-modal-button back-button' onClick={this.onBack}>{translate['Back']}</button>
              }
            </div>
          </div>
        </div>
    )
  }
}

PasswordRecovery.propTypes = {
  showRecovery: PropTypes.bool.isRequired,
  hideRecoveryClick: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  recoveryPasswordObject: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetPasswordBySmsRequest: ResetPassword.resetPasswordBySmsRequest,
    resetPasswordBySmsCheckCode: ResetPassword.resetPasswordBySmsCheckCode,
    resetPasswordBySms: ResetPassword.resetPasswordBySms,
    resetRecoveryPasswordReduxState: ResetPassword.resetRecoveryPasswordReduxState,
    searchUser: ResetPassword.searchUser,
  }, dispatch)
})
const mapStateToProps = state => ({
  recoveryPasswordObject: recoveryPasswordSelector(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery)