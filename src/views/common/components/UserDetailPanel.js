// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {getMessages} from "src/redux/selectors/translateSelector";
import {connect} from "react-redux";
import type {organizationType} from "src/consts/flowTypes/organization/organization";
import type {userProfileType, userType} from "src/consts/flowTypes/user/basicInformation";
import type {fileType} from "../../../consts/flowTypes/common/fileType";
import {bindActionCreators} from "redux";
import FileActions from "../../../redux/actions/commonActions/fileActions";
import {DefaultUserIcon} from "../../../images/icons";
import DefaultImageIcon from "../../../images/defaults/defaultImage_svg";

type UserDetailPanelProps = {
  translate: { [string]: string },
  organization: organizationType,
  profile: userProfileType,
  user: userType,
  profileImage: fileType,
  bannerImage: fileType,
  profileId: number,
  bannerId: number,
  actions: {
    getFile: Function,
  }
}

class UserDetailPanel extends React.Component<UserDetailPanelProps> {

  static propTypes = {
    translate: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profileId: PropTypes.number.isRequired,
    bannerId: PropTypes.number.isRequired,
    profileImage: PropTypes.object.isRequired,
    bannerImage: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {actions, bannerId, profileId} = this.props
    const {getFile} = actions
    getFile(profileId)
    getFile(bannerId)
  }

  render() {
    const {user, translate, profile, organization, profileImage, bannerImage} = this.props
    const isUser = organization === null
    const name = isUser
        ? !(user.first_name && user.last_name) ? '' : (user.first_name + " " + user.last_name)
        : organization.nike_name || organization.official_name
    return (
        <div className='user-detail-panel-container'>
          <div className='image-part-container'>
            {bannerImage && bannerImage.file
                ? <img className='banner covered-img' alt="profile banner"
                       src={bannerImage.file}/>
                : <DefaultImageIcon className="banner covered-img"/>
            }
            {profileImage && profileImage.file
                ? <img className="rounded-circle profile-media covered-img" alt="profile"
                       src={profileImage.file}/>
                : <DefaultUserIcon className="rounded-circle profile-media covered-img"/>
            }

          </div>
          <div className='user-detail-body'>
            <div className='user-detail-row'>
              <p className='user-detail-label user-detail-username'>{name}</p>
              <p className='user-detail-value user-detail-username-value'>@{user.username}</p>
            </div>
            <div className='user-detail-row'>
              <p>{translate['Contribution']}</p>
              <p className='user-detail-value'>{`2 ${translate['Skill']} ${translate['And']} 5 ${translate['Product']}`}</p>
            </div>
            {isUser ?
                <React.Fragment>
                  <div className='user-detail-row'>
                    <p>{translate['Work experience']}</p>
                    <p className='user-detail-value'>{`2 ${translate['Year']} ${translate['And']} 5 ${translate['Month']}`}</p>
                  </div>
                  <div className='user-detail-row'>
                    <p> {translate['Education Experience']}</p>
                    <p className='user-detail-value'>گرایش مهندسی برق</p>
                  </div>
                </React.Fragment>
                :
                <React.Fragment>
                  <div className='user-detail-row'>
                    <p>{translate['Employees']}</p>
                    <p className='user-detail-value'>{`${organization.staff_count ? organization.staff_count : 0} نفر`}</p>
                  </div>
                  <div className='user-detail-row'>
                    <p>{translate['Customers']}</p>
                    <p className='user-detail-value'>{`2 ${translate['Customer']}`}</p>
                  </div>
                  <div className='user-detail-row'>
                    <p>{translate['Certificate']}</p>
                    <p className='user-detail-value'>{`2 ${translate['Certificate']} ${translate['And']} 5 ${translate['Badge']}`}</p>
                  </div>
                </React.Fragment>
            }
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const profile = state.auth.client.profile
  const organization = state.auth.client.organization
  const bannerId = organization
      ? organization.organization_banner
      : profile.profile_banner
  const profileId = organization
      ? organization.organization_logo
      : profile.profile_media

  return {
    translate: getMessages(state),
    profile: state.auth.client.profile,
    organization: state.auth.client.organization,
    user: state.auth.client.user,
    profileImage: state.common.file.list[profileId],
    bannerImage: state.common.file.list[bannerId],
    bannerId: bannerId,
    profileId: profileId,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFile: FileActions.getFile,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPanel)