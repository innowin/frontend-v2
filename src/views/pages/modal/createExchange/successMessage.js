// @flow
import React from 'react'
import BtnBar from "../../../common/BtnBar/BtnBar"
import {CongratsTick} from "src/images/icons"
import {DOMAIN} from "src/consts/URLS"
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
        <p className="message-text">عملیات افزودن پنجره جدید با فیکیت انجام شد.</p>
        <p className="exchange-address">آدرس پنجره:‌ {DOMAIN + '/exchange/' + exchangeId}</p>
        <BtnBar
            acts={acts}
        />
      </div>
  )
}