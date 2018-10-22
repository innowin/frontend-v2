// @flow
import React from 'react'
import {TickSvgIcon, StarIcon, TagIcon, ExchangeExploreIcon} from 'src/images/icons'

type RightSideRegisterStepsModalProps = {
  translate: {[string]: string},
  step: number,
}
const RightSideRegisterStepsModal = (props: RightSideRegisterStepsModalProps) => {
  const {translate, step} = props
  return (
      <div className='right-side-register'>
        <div className='right-side-part right-side-part-active'>
          <h5 className='right-side-part-header'>{translate['Congratulations']}</h5>
          {step === 0 && <p className='right-side-part-description'>{translate['Congratulations description']}</p>}
          <div className='right-side-part-icon right-side-part-icon-active'><TickSvgIcon/></div>
        </div>
        <div className='right-side-part'>
          <h5 className='right-side-part-header'>{translate['Favorites fields']}</h5>
          {step === 1 && <p className='right-side-part-description'>{translate['Favorites fields description']}</p>}
          <div className={step > 0 ? 'right-side-part-icon right-side-part-icon-active' : 'right-side-part-icon'}><StarIcon/></div>
        </div>
        <div className='right-side-part'>
          <h5 className='right-side-part-header'>{translate['Tags']}</h5>
          {step === 2 && <p className='right-side-part-description'>{translate['Tags description']}</p>}
          <div className={step > 1 ? 'right-side-part-icon right-side-part-icon-active' : 'right-side-part-icon'}><TagIcon/></div>
        </div>
        <div className='right-side-part'>
          <h5 className='right-side-part-header'>{translate['Extend relations']}</h5>
          {step === 3 && <p className='right-side-part-description'>{translate['Extend relations description']}</p>}
          <div className={step > 2 ? 'right-side-part-icon right-side-part-icon-active' : 'right-side-part-icon'}><ExchangeExploreIcon/></div>
        </div>
      </div>
  )
}

export default RightSideRegisterStepsModal