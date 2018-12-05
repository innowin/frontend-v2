import React from 'react'
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"

const PostSkeleton = () => <div className='container-skeleton-content-cont'>
  <div id="line"/>
  <div className='container-skeleton-img-cont'>
    <DefaultUserIcon className='container-skeleton-img'/>
  </div>
  <div className='container-skeleton-name-cont'>
    <span className='user-default-skeleton'><span>                    </span></span>
    <span>    </span>
    <span className='user-default-skeleton'><span>                    </span></span>
    <div style={{fontSize: '11px', backgroundColor: '#f3f3f3', marginTop: '2px', width: '25%', borderRadius: '3px'}}><span> </span></div>
  </div>

  <div style={{fontSize: '13px', marginTop: '5px', lineHeight: '27px', backgroundColor: '#f3f3f3', borderRadius: '3px'}}>
    <span> </span>
  </div>
  <div style={{fontSize: '13px', marginTop: '4px', lineHeight: '27px', backgroundColor: '#f3f3f3', borderRadius: '3px'}}>
    <span> </span>
  </div>

  <div style={{direction: 'ltr', marginTop: '15px'}}>
    <div className='container-skeleton-items'>
      <i className="post-menu-bottom fa fa-ellipsis-h cursor-pointer" aria-hidden="true"/>
    </div>
    <div className='container-skeleton-items'>
      <i className="fa fa-share cursor-pointer post-menu-bottom" aria-hidden="true"/>
    </div>
  </div>
</div>

export default PostSkeleton