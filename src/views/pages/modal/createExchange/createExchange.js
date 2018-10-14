// @flow
import * as React from "react"
import {Component} from "react"
import {progressiveSteps} from "./createExchangeData"
import FontAwesome from "react-fontawesome"
import {Modal, ModalBody} from "reactstrap"
import MenuProgressive from "../../progressive/penu-progressive"
import {PROGRESSIVE_STATUS_CHOICES, WRAPPER_CLASS_NAMES} from "./createExchangeData";
import BasicInfo from "./basicInfo"
import People from "./people"
import MoreInfo from "./moreInfo"
import SuccessMessage from "./successMessage"


type CreateExchangeProps = {
  modalIsOpen: boolean,
  handleModalVisibility: Function
}

type CreateExchangeState = {
  activeStep: number,
  progressStatus: string,
  wrapperClassName: string
}

class CreateExchange extends Component<CreateExchangeProps, CreateExchangeState> {
  constructor() {
    super()
    this.state = {
      activeStep: 1,
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERING,
    }
  }
  _setStep = (newStep: number, status: string) => {
    this.setState({
          ...this.state,
          activeStep: newStep,
          progressStatus: status,
          wrapperClassName: WRAPPER_CLASS_NAMES.EXITING,
        },
        () => {
          this._afterStepChanging()
        })
  }

  _afterStepChanging = () => {
    setTimeout(() => this.setState({
      ...this.state,
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERED,
    }), 10)
  }

  _goToNextStep = () => {
    const {activeStep} = this.state
    if (activeStep < progressiveSteps.length + 1) {
      this._setStep(activeStep + 1, PROGRESSIVE_STATUS_CHOICES.GOING_NEXT)
    }
  }
  _goToPrevStep = () => {
    const {activeStep} = this.state
    if (activeStep !== 1) {
      this._setStep(activeStep - 1, PROGRESSIVE_STATUS_CHOICES.GOING_PREV)
    }
  }

  _handleModalVisibility = () => {
    this.props.handleModalVisibility()
  }
  _setContent = () => {
    const {activeStep} = this.state
    switch (activeStep) {
      case 1:
        return (
            <BasicInfo
              btnBarActs={[
                {title: 'لغو', func: this._handleModalVisibility},
                {title: 'بعدی', func: this._goToNextStep},
              ]}
            />
        )
      case 2:
        return (
            <MoreInfo/>
        )
      case 3:
        return (
            <People/>
        )
      case 4:
        return (
            <SuccessMessage/>
        )
      default:
        return <span/>
    }
  }

  render() {
    const {activeStep, progressStatus, wrapperClassName} = this.state
    const {modalIsOpen} = this.props
    const pageContent = this._setContent()
    return (
        <div>
          <Modal className="exchanges-modal" size="lg" isOpen={modalIsOpen} backdrop={false}>
            <ModalBody className="create-exchange-wrapper">
              <FontAwesome
                  name="times"
                  size="2x"
                  className="close-btn"
                  onClick={this._handleModalVisibility}
              />
              {/*<div className="progressive-wrapper">*/}
                <MenuProgressive
                    steps={progressiveSteps}
                    activeStep={activeStep}
                    status={progressStatus}
                />
              {/*</div>*/}
              <div className={`wrapper ${wrapperClassName}`}>
                {pageContent}
              </div>
            </ModalBody>
          </Modal>
        </div>
    )
  }
}
export default CreateExchange