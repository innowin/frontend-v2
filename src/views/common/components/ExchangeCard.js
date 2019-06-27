// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import FontAwesome from "react-fontawesome"
import {SupplyIcon, DemandIcon} from "src/images/icons";

type UserSquareProps = {
  translate: {[string]: string},
  followed?: boolean,
}
const ExchangeCard = (props: UserSquareProps) => {
  const {translate, followed} = props
  const demandCount = 10
  const supplyCount = 10
  // const followed = true
  return (
      <div className={followed ? 'user-card user-card-followed' : 'user-card'}>
        {followed
            ? <p className='followed-text'>{translate['Followed']}</p>
            : <FontAwesome name='plus' className='pulse follow-plus'/>
        }
        <img alt='user-profile' src='http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg' className='user-image'/>
        <div className='user-detail-container'>
          <p className='user-card-name'>نام فرد</p>
          <p className='user-card-desc'>نام فرد</p>
        </div>
        <div className='exchange-footer-container'>
          <div className='demand-container'>
            <DemandIcon className='exchange-demand-icon' dataValue='demand'/>
            {translate['Type demand']} {demandCount}
          </div>
          <div className='demand-container'>
            <SupplyIcon className='exchange-supply-icon' dataValue='supply'/>
            {translate['Type supply']} {supplyCount}
          </div>
        </div>
      </div>
  )
}

ExchangeCard.propTypes = {
  translate: PropTypes.object.isRequired,
  followed: PropTypes.bool,
}
export default ExchangeCard