// @flow
import * as React from "react"
import {Fragment} from 'react'
import FontAwesome from "react-fontawesome";
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import ResetPassword from "src/redux/actions/user/resetPasswordBySmsActions"
import {resetPasswordSelector} from "src/redux/selectors/user/resetPasswordState"

type passwordRecoveryProps = {
  showRecovery: boolean,
  hideRecoveryClick: Function,
  translate: { [string]: string },
  actions: {
    resetPasswordBySmsRequest: Function,
    resetPasswordBySmsCheckCode: Function,
    resetPasswordBySms: Function,
  },
  resetPasswordState: {
    userId: ?number,
    VerificationCode: ?number,
    step_name: string,
    isLoading: boolean,
    error: ?string
  }
}

type passwordRecoveryStates = {
  step: number,
  showPassword: boolean,
  showRepeatPassword: boolean,
  userIdentifier: ?string,
}

class PasswordRecovery extends React.Component <passwordRecoveryProps, passwordRecoveryStates> {
  constructor(props: passwordRecoveryProps) {
    super(props)
    this.state = {
      step: 0,
      showPassword: false,
      showRepeatPassword: false,
      userIdentifier: '',
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
    const {showRecovery} = this.props
    if (prevProps.showRecovery !== showRecovery && showRecovery) {
      this.setState({...this.state, step: 0})
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
      this.setState({...this.state, step: this.state.step - 1})
    }
  }

  onSuccess = () => {
    const {hideRecoveryClick, actions, resetPasswordState} = this.props
    const {resetPasswordBySmsRequest, resetPasswordBySmsCheckCode, resetPasswordBySms} = actions
    const {userId, VerificationCode} = resetPasswordState
    const {step, userIdentifier} = this.state

    if (step === 0) {
      const value: string = this.userIdentifier ? this.userIdentifier.value : ''
      this.setState({...this.state, userIdentifier: value, step: this.state.step + 1})
      return
    }
    else if (step === 1) {
      const emailChecked = this.emailChecked ? this.emailChecked.checked : false
      const phoneChecked = this.phoneChecked ? this.phoneChecked.checked : false
      userIdentifier && phoneChecked && !emailChecked ? resetPasswordBySmsRequest(userIdentifier)
        : alert("قسمت ایمیل غیر فعال هست!")
    }
    else if (step === 2) {
      const code1 = this.activationCode1 ? this.activationCode1.value : ''
      const code2 = this.activationCode2 ? this.activationCode2.value : ''
      const code3 = this.activationCode3 ? this.activationCode3.value : ''
      const code4 = this.activationCode4 ? this.activationCode4.value : ''
      const code5 = this.activationCode5 ? this.activationCode5.value : ''
      const activationCode = code1 + code2 + code3 + code4 + code5
      ;(activationCode.length === 5 && userId)
        ? resetPasswordBySmsCheckCode(userId, activationCode)
        : alert("تعداد رقم کد مجاز نیست!")
    }
    else if (step === 3) {
      const password = this.password ? this.password.value : false
      const passwordConfirm = this.passwordConfirm ? this.passwordConfirm.value : false

      if (password && (password === passwordConfirm)) {
        resetPasswordBySms(userId, VerificationCode, password, passwordConfirm)
        hideRecoveryClick()
      } else{
        alert("دو پسوورد یکی نیستند!")
      }
      return
    }
    this.setState({...this.state, step: this.state.step + 1})
  }

  render() {
    const {showRecovery, translate} = this.props
    const {step, showPassword, showRepeatPassword} = this.state

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
                className='settingModal-menu-general-input'
                placeholder={translate['Username, email, phone']}
                ref={e => this.userIdentifier = e}
              />
            </Fragment>
            }
            {step === 1 &&
            <Fragment>
              <p className='password-modal-title'>{translate['Pick a way for creating new password']}</p>
              <label className="container">
                <input type="checkbox" defaultChecked ref={e => this.emailChecked = e}/>
                <span className="checkmark"/>
                <p className='password-way-text'>{translate['Send recovery link to']} mohammad.hooshdar@yahoo.com</p>
              </label>
              <label className="container">
                <input type="checkbox" ref={e => this.phoneChecked = e}/>
                <span className="checkmark"/>
                <p className='password-way-text'>{translate['Send verification code to phone']} 09379439798</p>
              </label>
            </Fragment>
            }
            {step === 2 &&
            <Fragment>
              <p className='password-modal-title'>{translate['Enter the activation code']}</p>
              <span className='activation-text'>{translate['Activation code']}</span>
              <input tabIndex='5' className='settingModal-menu-general-input activation-input'
                     maxLength={1}
                     ref={e => this.activationCode5 = e}
              />
              <input tabIndex='4' className='settingModal-menu-general-input activation-input'
                     maxLength={1}
                     ref={e => this.activationCode4 = e}
              />
              <input tabIndex='3' className='settingModal-menu-general-input activation-input'
                     maxLength={1}
                     ref={e => this.activationCode3 = e}
              />
              <input tabIndex='2' className='settingModal-menu-general-input activation-input'
                     maxLength={1}
                     ref={e => this.activationCode2 = e}
              />
              <input tabIndex='1' className='settingModal-menu-general-input activation-input'
                     maxLength={1}
                     ref={e => this.activationCode1 = e}
              />
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
                  />
                </div>
                <span className='password-error'>{translate['Password not equal to repeated']}</span>
              </div>
              <p className='password-modal-title password-modal-text'>{translate['Select a hard password']}</p>
            </Fragment>
            }
          </div>
          <div className='password-modal-footer'>
            <button className='common-modal-button search-button' onClick={this.onSuccess}>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetPasswordBySmsRequest: ResetPassword.resetPasswordBySmsRequest,
    resetPasswordBySmsCheckCode: ResetPassword.resetPasswordBySmsCheckCode,
    resetPasswordBySms: ResetPassword.resetPasswordBySms,
  }, dispatch)
})
const mapStateToProps = state => ({
  resetPasswordState: resetPasswordSelector(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery)