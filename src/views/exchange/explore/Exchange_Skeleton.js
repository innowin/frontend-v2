// @flow
import * as React from 'react'
import {DefaultUserIcon} from "src/images/icons"

const Exchange_Skeleton = () => {
  return (
      <div className='exchange-model'>

        <DefaultUserIcon className='exchange-model-avatar-default'/>

        <div className='skeleton-overflow-hidden'>
          <div id="line"/>
          <div className='exchange-model-title-skeleton'><span> </span></div>
          <div className='exchange-model-description-skeleton'><span> </span></div>

          <div className='exchange-model-detail-skeleton'>
            <div className='exchange-model-detail-skeleton-cont'>
              <span> </span>
            </div>
          </div>

          <div className='exchange-model-detail-skeleton'>
            <div className='exchange-model-detail-skeleton-cont'>
              <span> </span>
            </div>
          </div>
        </div>

        <button className='exchange-followed-skeleton'><span> </span><div id="line"/></button>

      </div>
  )
}

export default Exchange_Skeleton
