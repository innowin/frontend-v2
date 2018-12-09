import React from 'react'
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import Material from "../../common/components/Material"

const UserSideSkeleton = () => <div className='sidebar-skeleton'>
  <div id="lineSide"/>
  <div className='container-skeleton-banner'/>
  <DefaultUserIcon className='user-default-profile-photo'/>
  <div className='user-default-profile-name'><span> </span></div>
  <div className='user-default-profile-desc'><span> </span></div>
  <div className='user-default-profile-desc'><span> </span></div>

  <div className='user-default-profile-btn-cont'>
    <Material className="btn btn-outline-secondary sidebarBottom user-default-profile-btn " content='ارسال پیام'/>
    <Material className="btn btn-outline-secondary sidebarBottom user-default-profile-btn" content='دنبال کردن'/>
  </div>

  <div className='user-default-profile-logos-cont'>
    <div className='user-default-profile-logo'><i className="fa user-default-logo fa-youtube-play"/></div>
    <div className='user-default-profile-logo'><i className="fa user-default-logo fa-telegram"/></div>
    <div className='user-default-profile-logo'><i className="fa user-default-logo fa-instagram"/></div>
    <div className='user-default-profile-logo'><i className="fa user-default-logo fa-linkedin-square"/></div>
  </div>

  <br/><br/><br/><br/><br/><br/><br/><br/>

</div>

export default UserSideSkeleton