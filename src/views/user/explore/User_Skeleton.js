// @flow
import * as React from 'react'
import {DefaultUserIcon} from "src/images/icons"

const User_Skeleton = () => {
  return (
      <div className='users-explore'>
        <div className='user-banner-skeleton'>
          <div id="line"/>
        </div>

        <DefaultUserIcon className='user-default-profile-photo-skeleton'/>


        <div>
          <div className='user-name-skeleton'><span> </span>
            <div id="line"/>
          </div>
          <div className='user-id-skeleton'><span> </span>
            <div id="line"/>
          </div>
        </div>

        <div className='user-description-skeleton'>
          <div className='user-description-row-skeleton'/>
          <div className='user-description-row-skeleton'/>
          <div className='user-description-row-skeleton'/>
          <div id="line" style={{animationDelay: '0.3s'}}/>
        </div>

        {/*<div className='user-baj-container'>*/}
        {/*{*/}
        {/*data.badges.map((badge, i) =>*/}
        {/*<img key={i} src={REST_URL + badge.badge_related_badge_category.badge_related_media.file} className='user-baj' alt='badge'/>*/}
        {/*)*/}
        {/*}*/}
        {/*</div>*/}

        <button className='user-follow-skeleton'><span> </span>
          <div id="line"/>
        </button>

      </div>
  )
}


export default User_Skeleton
