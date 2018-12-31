// @flow
import * as React from 'react'
import {DefaultUserIcon} from 'src/images/icons'
import ChannelIcon from '../../../images/common/channel_svg'
import {REST_URL} from '../../../consts/URLS'
import {Link} from 'react-router-dom'

const Exchange_Skeleton = () => {
  return (
      <div className='exchange-model'>

        <div className='exchange-model-avatar'>
          <ChannelIcon className='exchange-model-avatar-default'/>
        </div>

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

        <button className='exchange-followed-skeleton'><span> </span>
          <div id="line"/>
        </button>

      </div>
  )
}

export default Exchange_Skeleton
