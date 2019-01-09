import React from 'react'
import DefaultUserIcon from '../../../images/defaults/defaultUser_svg'

const PostSkeleton = () => (
    <div className='container-skeleton-content-cont'>

      <div>
        <div className='container-skeleton-img-cont'>
          <DefaultUserIcon className='container-skeleton-img'/>
        </div>

        <div className='container-skeleton-name-cont'>
          <span className='user-default-skeleton'><span>                    </span></span>
          <span>    </span>
          <span className='user-default-skeleton'><span>                    </span></span>

          <div className='user-default-profile-skelte-date'>
            <span> </span>
          </div>
        </div>
      </div>

      <div className='user-default-profile-skelte'><span> </span></div>

      <div className='user-default-profile-skelte'><span> </span></div>

      <div style={{ direction: 'ltr', marginTop: '15px' }}>
        <div className='container-skeleton-items'>
          <i className="post-menu-bottom fa fa-ellipsis-h cursor-pointer" aria-hidden="true"/>
        </div>
        <div className='container-skeleton-items'>
          <i className="fa fa-share cursor-pointer post-menu-bottom" aria-hidden="true"/>
        </div>
      </div>
      <div id="line"/>
    </div>
)

export default PostSkeleton