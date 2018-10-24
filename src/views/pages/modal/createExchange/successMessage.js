// @flow
import React from 'react'
import BtnBar from "../../../common/BtnBar/BtnBar"
import {CongratsTick} from "../../../../images/icons"
import {DOMAIN} from "../../../../consts/URLS"
import type {ActType} from "../../../common/BtnBar/BtnBar";


type Props = {
  exchangeId: string,
  acts: Array<ActType>
}

export default (props: Props) => {
  const {acts, exchangeId} = props
  return (
      <div className="success-message">
        <CongratsTick className="success-image"/>
        <p className="message-text">عملیات افزودن بورس جدید با فیکیت انجام شد.</p>
        <p className="exchange-address">آدرس بورس:‌ {DOMAIN + '/exchange/' + exchangeId}</p>
        <BtnBar
            acts={acts}
        />
      </div>
  )
}