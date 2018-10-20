// @flow
import React, {Fragment} from 'react'
import FontAwesome from "react-fontawesome";

type passwordRecoveryProps = {
  showRecovery: boolean,
  hideRecoveryClick: Function,
  translate: { [string]: string },
}

type passwordRecoveryStates = {
  step: number,
  showPassword: boolean,
  showRepeatPassword: boolean,
}

class PasswordRecovery extends React.Component <passwordRecoveryProps, passwordRecoveryStates> {
  constructor(props: passwordRecoveryProps) {
    super(props)
    this.state = {
      step: 0,
      showPassword: false,
      showRepeatPassword: false,
    }
  }

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
    const {hideRecoveryClick} = this.props
    const {step} = this.state

    if (step === 0) {

    }
    else if (step === 1) {

    }
    else if (step === 2) {

    }
    else if (step === 3) {
      hideRecoveryClick()
      return
    }
    this.setState({...this.state, step: this.state.step + 1})
  }

  render() {
    const {showRecovery, hideRecoveryClick, translate} = this.props
    const {step, showPassword, showRepeatPassword} = this.state

    return (
        <div>
          <div className={showRecovery ? "makeDark" : "makeDark-out"} onClick={hideRecoveryClick}>
            {/*dark div*/}
          </div>

          <div className={showRecovery ? "common-modal password-modal" : "common-modal-out password-modal"}>
            <div className='password-modal-header'>
              {translate['Forgot password']}
            </div>
            <div className='password-modal-content'>
              {step === 0 &&
              <Fragment>
                <p className='password-modal-title'>{translate['Insert username or email or phone']}</p>
                <input className='settingModal-menu-general-input' placeholder={translate['Username, email, phone']}/>
              </Fragment>
              }
              {step === 1 &&
              <Fragment>
                <p className='password-modal-title'>{translate['Pick a way for creating new password']}</p>
                <label className="container">
                  <input type="checkbox" defaultChecked/>
                  <span className="checkmark"/>
                  <p className='password-way-text'>{translate['Send recovery link to']} mohammad.hooshdar@yahoo.com</p>
                </label>
                <label className="container">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='password-way-text'>{translate['Send verification code to phone']} 09379439798</p>
                </label>
              </Fragment>
              }
              {step === 2 &&
              <Fragment>
                <p className='password-modal-title'>{translate['Enter the activation code']}</p>
                <span className='activation-text'>{translate['Activation code']}</span>
                <input tabIndex='5' className='settingModal-menu-general-input activation-input' maxLength={1}/>
                <input tabIndex='4' className='settingModal-menu-general-input activation-input' maxLength={1}/>
                <input tabIndex='3' className='settingModal-menu-general-input activation-input' maxLength={1}/>
                <input tabIndex='2' className='settingModal-menu-general-input activation-input' maxLength={1}/>
                <input tabIndex='1' className='settingModal-menu-general-input activation-input' maxLength={1}/>
              </Fragment>
              }
              {step === 3 &&
              <Fragment>
                <p className='password-modal-title'>{translate['Select a new password']}</p>
                <div className='password-step-container'>
                  <span className='activation-text password-text'>{translate['Password']}</span>
                  <div className='password-input-container'>
                    <FontAwesome className='eye-icon pulse' name={showPassword ? 'eye-slash' : 'eye'} onClick={this.changeStatePassword}/>
                    <input type={showPassword ? 'text' : 'password'} className='password-text-field settingModal-menu-general-input-password'/>
                  </div>
                </div>
                <div className='password-step-container'>
                  <span className='activation-text password-text'>{translate['Repeat password']}</span>
                  <div className='password-input-container'>
                    <FontAwesome className='eye-icon pulse' name={showRepeatPassword ? 'eye-slash' : 'eye'} onClick={this.changeStateRepeatPassword}/>
                    <input type={showRepeatPassword ? 'text' : 'password'} className='password-text-field settingModal-menu-general-input-password'/>
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

export default PasswordRecovery