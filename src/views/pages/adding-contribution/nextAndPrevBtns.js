// @flow
import * as React from 'react'
import {ThinDownArrow} from '../../../images/icons'


type NextPrevBtbsProps = {
    goToNextStep: Function | string, //
    goToPrevStep: Function | string,
    tips?: string,
    prevBtnTitle?: string,
    nextBtnTitle?: string,
    isGoToNextBtnDisabled?: boolean
}
// TODO: ali => if there is't need to 'tips' property. remove that.
const NextPrevBtns = (props: NextPrevBtbsProps) => {

    const {
        goToNextStep,
        goToPrevStep,
        tips,
        prevBtnTitle = 'قبلی',
        nextBtnTitle = 'بعدی',
        isGoToNextBtnDisabled
    } = props

    return (
        <div className="next-prev-btns">
            {console.log('the guy is disabled is : ', isGoToNextBtnDisabled)}
            <div onClick={goToPrevStep} className="prev pointer">
                <ThinDownArrow className="right-arrow"/>
                {prevBtnTitle}
            </div>
            {tips && <div className="tips">{tips}</div>}
            <div onClick={goToNextStep} className={isGoToNextBtnDisabled? 'next pointer disabled' : 'next pointer'}>
                <ThinDownArrow className="left-arrow"/>
                {nextBtnTitle}
            </div>
        </div>
    )
}
export default NextPrevBtns