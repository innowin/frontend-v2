// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import RightSideRegisterStepsModal from './RightSideRegisterStepsModal'
import LeftSideRegisterStepsModal from './LeftSideRegisterStepsModal'

type registerStepsModalProps = {
  showRegisterModal: boolean,
  hideRecoveryClick: Function,
  translate: { [string]: string },
}

type registerStepsModalStates = {
  step: number,
}

class RegisterStepsModal extends React.Component <registerStepsModalProps, registerStepsModalStates> {
  constructor(props: registerStepsModalProps) {
    super(props)
    this.state = {
      step: 0,
    }
  }

  componentDidUpdate(prevProps: registerStepsModalProps) {
    const {showRegisterModal} = this.props
    if (prevProps.showRegisterModal !== showRegisterModal && showRegisterModal) {
      this.setState({...this.state, step: 0})
    }
  }

  onBack = () => {
    const {step} = this.state

    if (step >= 1) {
      this.setState({...this.state, step: this.state.step - 1})
    }
  }

  onNext = () => {
    const {hideRecoveryClick} = this.props
    const {step} = this.state

    if (step === 0) {

    }
    else if (step === 1) {

    }
    else if (step === 2) {

    }
    else if (step === 3) {

    }
    else if (step === 4) {

    }
    else if (step === 5) {
      hideRecoveryClick()
      return
    }
    this.setState({...this.state, step: this.state.step + 1})
  }

  render() {
    const {showRegisterModal, translate} = this.props
    const {step} = this.state

    return (
        <div style={!showRegisterModal ? {zIndex: 0} : {}} className='register-modal-wrapper'>
          <div className={showRegisterModal
              ? "common-modal register-steps-modal"
              : "common-modal-out register-steps-modal"}>
            <RightSideRegisterStepsModal translate={translate} step={step}/>
            <LeftSideRegisterStepsModal onCompleteProfile={() => (5)} onStartTour={() => (5)} translate={translate} onNext={this.onNext}
                                        onBack={this.onBack} step={step}/>
          </div>
        </div>
    )
  }
}

RegisterStepsModal.propTypes = {
  showRegisterModal: PropTypes.bool.isRequired,
  hideRecoveryClick: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
}

export default RegisterStepsModal