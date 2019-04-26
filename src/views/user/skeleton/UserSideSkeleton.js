import Material from '../../common/components/Material'
import React from 'react'
import {DefaultUserIcon, InstagramIcon, LinkedInIcon, TelegramIcon, TwitterIcon, DefaultOrganIcon} from 'src/images/icons'

const UserSideSkeleton = (props) => <div className='sidebar-skeleton'>
  <div id="lineSide"/>
  <div>
    <div className='container-skeleton-banner'/>
    <div className='default-skelete-skeleton-img'>
      {
        props.type === 'user' ? <DefaultUserIcon className='default-skelete-profile-photo'/> : <DefaultOrganIcon className='default-org-skelete-profile-photo'/>
      }
    </div>
    <div className='user-default-profile-name'><span> </span></div>
    <div className='user-default-profile-desc'><span> </span></div>
    <div className='user-default-profile-desc'><span> </span></div>

    <section className='user-sidebar-status'>
      <div className='user-sidebar-status-border user-sidebar-skelete-status-border'>
        <div className='user-sidebar-status-content user-sidebar-skelete-status-content'>
          <span> </span>
        </div>
      </div>
    </section>

    <section className='user-sidebar-buttons'>
      <div className="sidebarBottomParent-skeleton">
        <Material className="btn btn-outline-secondary sidebarBottom side-user" content=''/>
        <Material className="btn btn-outline-secondary sidebarFollowBottom follow-green-button side-user-follow" content=''/>
      </div>
    </section>

    <div className="social-network-skeleton">
      <TwitterIcon className='social-icon'/>
      <TelegramIcon className='social-icon'/>
      <InstagramIcon className='social-icon'/>
      <LinkedInIcon className='social-icon'/>
    </div>


  </div>

</div>

export default UserSideSkeleton