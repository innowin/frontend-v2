import React from 'react'
import {ThinDownArrow} from '../../../images/icons'

const NextPrevBtns = ({goToNextStep, goToPrevStep, tips, prevBtnTitle = 'قبلی', nextBtnTitle = 'بعدی'}) => (
    <div className="next-prev-btns">
        <div onClick={goToPrevStep} className="prev pointer">
            <ThinDownArrow className="right-arrow"/>
            {prevBtnTitle}
        </div>
        {tips && <div className="tips">s</div>}
        <div onClick={goToNextStep} className="next pointer">
            <ThinDownArrow className="left-arrow"/>
            {nextBtnTitle}
        </div>
    </div>
)

export default NextPrevBtns