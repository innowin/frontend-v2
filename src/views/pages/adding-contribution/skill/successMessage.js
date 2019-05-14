// @flow
import * as React from "react"
import {CircularTickSvg} from "src/images/icons"
import type {SuccessMessageActionType} from "../types"
import ActBar from "../actBar"


type SuccessMessageProps = {
  shareContribution: Function,
  finishHandler: Function
}

const SuccessMessage = (props: SuccessMessageProps) => {
  const {shareContribution, finishHandler} = props
  const actions: Array<SuccessMessageActionType> = [
    {
      title: 'به اشتراک بگذارید',
      image: (<span className="act-image">?</span>),
      handler: shareContribution
    },
    {
      title: 'پایان',
      handler: finishHandler
    },
  ]

  return (
      <div className="success-message">
        <CircularTickSvg className="message-image"/>
        <div className="message-text">
          مهارت شما با موفقیت در سامانه ثبت شد و در فهرست آورده‌های شما قرار گرفت
        </div>
        <ActBar acts={actions}/>
      </div>
  )
}

export default SuccessMessage
