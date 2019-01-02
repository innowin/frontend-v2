import CertificateIcon from "../../../images/user/certificate_svg"
import ContributionIcon from "../../../images/common/contribution_svg"
import EducationIcon from "../../../images/user/education_svg"
import InformationIcon from "../../../images/common/information_svg"
import postIcon from "../../../images/user/post_svg"
import React from 'react'
import SocialIcon from "../../../images/common/social_svg"
import workExperienceIcon from "../../../images/user/workExperience_svg"
import {CategoryTitle, Tabs} from "../../common/cards/Frames"

const UserHeaderSkeleton = () => <div>
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
      title={<span style={{backgroundColor: '#f3f3f3', borderRadius: '3px'}}><span>          </span></span>}
  />
</div>

export default UserHeaderSkeleton