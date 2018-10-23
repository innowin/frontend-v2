// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import ContentUser from "./ContentUser"
import ExtendRelationsSocialAccounts from './ExtendRelationsSocialAccounts'
import constants from "../../../../consts/constants"
import ExtendRelationsUsers from "./ExtendRelationsSocialUsers";

type LeftSideRegisterStepsModalProps = {
  translate: { [string]: string },
  onNext: Function,
  onBack: Function,
  step: number,
}
type LeftSideRegisterStepsModalStates = {
  user: {
    type: string,
    social: {
      gmail: string,
      linkedin: string,
    }
  },
}


class LeftSideRegisterStepsModal extends React.Component<LeftSideRegisterStepsModalProps, LeftSideRegisterStepsModalStates> {
  constructor(props: LeftSideRegisterStepsModalProps) {
    super(props)
    this.state = {
      user: {
        type: constants.USER_TYPES.PERSON,
        social: {
          gmail: 'asdasdasd',
          linkedin: '',
        }
      }
    }
  }

  changeType = (type: string) => {
    const prevUser = this.state.user
    this.setState({
      ...this.state,
      user: {
        ...prevUser,
        type: type,
      }
    })
  }

  render () {
    const {translate, onNext, onBack, step} = this.props
    const {user} = this.state
    return (
        <div className='left-side-register'>
          <div className='register-steps-modal-content'>
            {step === 0 && <ContentUser translate={translate} changeType={this.changeType} type={user.type}/>}
            {step === 3 && <ExtendRelationsSocialAccounts translate={translate} social={user.social}/>}
            {step === 4 && <ExtendRelationsUsers translate={translate}/>}
          </div>
          <div className='register-steps-modal-footer'>
            <button className='common-modal-button search-button'
                    onClick={onNext}>{translate['Next']}</button>
            {step !== 0 && step !== 1 &&
            <button className='common-modal-button back-button back-button-register'
                    onClick={onBack}>{translate['Previous']}</button>
            }
          </div>
        </div>
    )
  }
}

LeftSideRegisterStepsModal.propTypes = {
  translate: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
}

export default LeftSideRegisterStepsModal