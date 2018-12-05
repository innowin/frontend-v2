import Sidebar from "./Sidebar"
import Exchanges from "./Exchanges"
import {ClipLoader} from "react-spinners"
import * as React from "react"
import FontAwesome from "react-fontawesome"
import {NavLink} from "react-router-dom"
import postIcon from "../../../images/user/post_svg"
import InformationIcon from "../../../images/common/information_svg"
import ContributionIcon from "../../../images/common/contribution_svg"
import SocialIcon from "../../../images/common/social_svg"
import EducationIcon from "../../../images/user/education_svg"
import workExperienceIcon from "../../../images/user/workExperience_svg"
import CertificateIcon from "../../../images/user/certificate_svg"
import {CategoryTitle, Tabs} from "../../common/cards/Frames"
import {DefaultUserIcon} from "../../../images/icons"

class User_Skeleton extends React.Component {

  render() {
    return (
        <div className='all-exchanges-parent'>

          <div className='sidebar-skeleton'>
            <div className='container-skeleton-banner'/>
            <DefaultUserIcon className='user-default-profile-photo'/>
          </div>

          <div className='container-skeleton'>
            <Tabs>
              <div className="-tab">{postIcon}</div>
              <div className="-tab"><InformationIcon/></div>
              <div className="-tab"><ContributionIcon/></div>
              <div className="-tab"><SocialIcon/></div>
              <div className="-tab"><EducationIcon/></div>
              <div className="-tab">{workExperienceIcon}</div>
              <div className="-tab"><CertificateIcon/></div>
            </Tabs>
            <CategoryTitle
                title={'سلام'}
            />

            <div className='container-skeleton-content-cont'>
              <div className='container-skeleton-img-cont'>
                <DefaultUserIcon className='container-skeleton-img'/>
              </div>
              <div className='container-skeleton-name-cont'>
                سید اصغر
                <span>    </span>
                <span style={{color: '#CDCCCD'}}>asghar</span>
                <div style={{fontSize: '11px', color: '#CDCCCD'}}>سید اصغر</div>
              </div>

              <div style={{fontSize: '13px', marginTop: '2px', lineHeight: '27px'}}>
                ساخت سلول خورشیدی با 70درصد شفافیت+تصویر گروهی از محققان دانشگاه UCLA یک سلول خورشیدی با 70درصد شفافیت ساخته اند. تصویری از این سلول های خورشیدی در لینک زیر قابل مشاهده است.
              </div>

              <div style={{direction: 'ltr'}}>
                <div className='container-skeleton-items'>
                  <i className="post-menu-bottom fa fa-ellipsis-h cursor-pointer" aria-hidden="true"/>
                </div>
                <div className='container-skeleton-items'>
                  <i className="fa fa-share cursor-pointer post-menu-bottom" aria-hidden="true"/>
                </div>
              </div>

            </div>


          </div>
        </div>
    )
  }

}

export default User_Skeleton