// @flow
import * as React from "react"
import {CircularTickSvg, CertificateIcon, AgentSvgIcon} from "src/images/icons"
import ActBar from "../actBar"
import type {SuccessMessageActionType} from "../types"


type SuccessMessageProps = {
  nowCreatedId: number,
  shareContribution: Function,
  introToExchange: Function,
  findAgent: Function,
  getCertificateHandler: Function,
  finishHandler: Function
}

const SuccessMessage = (props: SuccessMessageProps) => {
  const {nowCreatedId, shareContribution, introToExchange, findAgent, getCertificateHandler, finishHandler} = props
  const actions: Array<SuccessMessageActionType> = ([
    {
      title: 'به اشتراک بگذارید',
      image: (<span className="act-image">?</span>),
      handler: shareContribution
    },
    {
      title: 'عرضه در پنجره',
      image: (<span className="act-image">?</span>),
      handler: introToExchange
    },
    {
      title: 'یافتن کارگزار',
      image: (<AgentSvgIcon className="act-image"/>),
      handler: findAgent
    },
    {
      title: 'اخذ گواهی‌نامه',
      image: (<CertificateIcon className="act-image"/>),
      handler: getCertificateHandler
    },
    {
      title: 'پایان',
      handler: finishHandler
    },
  ])

  return (
      <div className="success-message">
        <CircularTickSvg className="message-image"/>
        <div className="message-text">
          محصول شما با موفقیت در سامانه ثبت شد و در فهرست آورده‌های شما قرار گرفت
        </div>
        <div className="small-url"> آدرس محصول: {`http://daneshboom.ir/product/${nowCreatedId}/basicInformation`}</div>
        <ActBar acts={actions}/>
      </div>
  )
}

export default SuccessMessage
