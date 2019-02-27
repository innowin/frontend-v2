// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import constants from "src/consts/constants"
import ContentUser from "./ContentUser"
import ExtendRelationsSocialAccounts from './ExtendRelationsSocialAccounts'
import ExtendRelationsUsers from "./ExtendRelationsUsers"
import ExtendRelationsExchanges from "./ExtendRelationsExchanges"
import FavoriteFields from "./FavoriteFields"
import Tags from './Tags'

type LeftSideRegisterStepsModalProps = {
  translate: { [string]: string },
  onNext: Function,
  onBack: Function,
  onStartTour: Function,
  onCompleteProfile: Function,
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
        type: constants.USER_TYPES.USER,
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

  render() {
    const {translate, onNext, onBack, onStartTour, onCompleteProfile, step} = this.props
    const {user} = this.state
    return (
        <div className='left-side-register'>
          <div className='register-steps-modal-content'>
            {step === 0 && <ContentUser translate={translate} changeType={this.changeType} type={user.type}/>}
            {step === 1 && <FavoriteFields translate={translate}/>}
            {step === 2 && <Tags translate={translate}/>}
            {step === 3 && <ExtendRelationsSocialAccounts translate={translate} social={user.social}/>}
            {step === 4 && <ExtendRelationsUsers translate={translate}/>}
            {step === 5 && <ExtendRelationsExchanges translate={translate}/>}
          </div>
          <div className='register-steps-modal-footer'>
            <button className='common-modal-button search-button footer-button'
                    onClick={onNext}>{step === 5 ? translate['Start Inovin'] : translate['Next']}</button>
            {step === 5 &&
            <button className='common-modal-button back-button footer-button'
                    onClick={onStartTour}>{translate['Inovin tour']}
            </button>
            }
            {step === 5 &&
            <button className='common-modal-button back-button footer-button'
                    onClick={onCompleteProfile}>{translate['Complete profile']}
            </button>
            }
            {step !== 0 && step !== 1 &&
            <button className='common-modal-button back-button footer-button'
                    onClick={onBack}>{translate['Previous']}
            </button>
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
  onStartTour: PropTypes.func.isRequired,
  onCompleteProfile: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
}

export default LeftSideRegisterStepsModal