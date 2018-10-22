// @flow
import React from 'react'

type LeftSideRegisterStepsModalProps = {
  translate: { [string]: string },
  onNext: Function,
  onBack: Function,
  step: number,
}

const LeftSideRegisterStepsModal = (props: LeftSideRegisterStepsModalProps) => {
  const {translate, onNext, onBack, step} = props
  return (
      <div className='left-side-register'>
        <div className='register-steps-modal-content'>
        </div>
        <div className='register-steps-modal-footer'>
          <button className='common-modal-button search-button'
                  onClick={onNext}>{translate['Next']}</button>
          {step !== 0 &&
          <button className='common-modal-button back-button back-button-register'
                  onClick={onBack}>{translate['Previous']}</button>
          }
        </div>
      </div>
  )
}

export default LeftSideRegisterStepsModal