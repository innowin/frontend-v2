// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {getMessages} from "src/redux/selectors/translateSelector"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import FileActions from "src/redux/actions/commonActions/fileActions"
import {DefaultUserIcon} from "src/images/icons"
import {Link} from "react-router-dom"
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {fileType} from '../../../consts/flowTypes/common/fileType'
import constants from '../../../consts/constants'

type UserDetailPanelProps = {
  translate: { [string]: string },
  identity: identityType,
  bannerImage: fileType,
  profileImage: fileType,
  actions: {
    getFile: Function,
  }
}

type UserDetailPanelStates = {
  bannerLoaded: boolean,
  profileLoaded: boolean,
  getFilesInDidMount: boolean,
}

class UserDetailPanel extends React.Component<UserDetailPanelProps, UserDetailPanelStates> {
  constructor(props) {
    super(props)
    this.state = {
      bannerLoaded: false,
      profileLoaded: false,

      getFilesInDidMount: false
    }
  }

  static propTypes = {
    translate: PropTypes.object.isRequired,
    profileImage: PropTypes.object,
    bannerImage: PropTypes.object,
    identity: PropTypes.object,
    actions: PropTypes.object.isRequired
  }

  componentWillMount(): void {
    const {actions, profileImage, bannerImage, identity} = this.props
    const {getFile} = actions

    if (!profileImage) {
      getFile(identity.profile_media)
    }
    if (!bannerImage) {
      getFile(identity.profile_banner)
    }
  }

  componentDidMount() {
    const {actions, profileImage, bannerImage, identity} = this.props
    const {getFile} = actions

    if (!profileImage) {
      getFile(identity.profile_media)
    }
    if (!bannerImage) {
      getFile(identity.profile_banner)
    }

    //Added for profile url check
    if (bannerImage && bannerImage.file) {
      let profile = new Image()
      profile.src = bannerImage.file
      profile.onload = () => {
        this.setState({...this.state, bannerLoaded: true})
      }
    }
    if (profileImage && profileImage.file) {
      let profile = new Image()
      profile.src = profileImage.file
      profile.onload = () => {
        this.setState({...this.state, profileLoaded: true})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bannerImage !== nextProps.bannerImage || this.props.profileImage !== nextProps.profileImage) {
      this.setState({...this.state, bannerLoaded: false, profileLoaded: false}, () => {
        if (nextProps.bannerImage && nextProps.bannerImage.file) {
          let profile = new Image()
          profile.src = nextProps.bannerImage.file
          profile.onload = () => {
            this.setState({...this.state, bannerLoaded: true})
          }
        }
        if (nextProps.profileImage && nextProps.profileImage.file) {
          let profile = new Image()
          profile.src = nextProps.profileImage.file
          profile.onload = () => {
            this.setState({...this.state, profileLoaded: true})
          }
        }
      })
    }
  }

  render() {
    const {bannerLoaded, profileLoaded} = this.state
    const {identity, profileImage, bannerImage} = this.props
    const isUser = identity.identity_type === constants.USER_TYPES.USER
    const name = isUser
        ? !(identity.first_name || identity.last_name) ? "" : (identity.first_name + " " + identity.last_name)
        : identity.nike_name || identity.official_name
    return (
        <div className='user-detail-panel-container'>
          <div className='image-part-container'>

            {bannerImage && bannerImage.file && bannerLoaded
                ? <img className='banner covered-img' alt="profile banner"
                       src={bannerImage.file}/>
                : <div className='banner covered-img background-strips'/> // <DefaultImageIcon className="banner covered-img"/>
            }
            {profileImage && profileImage.file && profileLoaded ?
                <Link to={isUser ? `/user/${identity.id}` : `/organization/${identity.id}`}>
                  <img className="rounded-circle profile-media covered-img" alt="profile" src={profileImage.file}/>
                </Link>
                :
                <Link to={isUser ? `/user/${identity.id}` : `/organization/${identity.id}`}>
                  <DefaultUserIcon className="rounded-circle profile-media covered-img"/>
                </Link>
            }

          </div>

          <div className='user-detail-body'>
            <div className='user-detail-row'>
              <p className='user-detail-label user-detail-username'>{name}</p>
              <p className='user-detail-value user-detail-username-value'>@{identity.username}</p>
            </div>
            {/*<div className='user-detail-row'>*/}
            {/*<p>{translate["Contribution"]}</p>*/}
            {/*<p className='user-detail-value'>{`2 ${translate["Skill"]} ${translate["And"]} 5 ${translate["Product"]}`}</p>*/}
            {/*</div>*/}
            {/*{isUser ?*/}
            {/*<React.Fragment>*/}
            {/*<div className='user-detail-row'>*/}
            {/*<p>{translate["Work experience"]}</p>*/}
            {/*<p className='user-detail-value'>{`2 ${translate["Year"]} ${translate["And"]} 5 ${translate["Month"]}`}</p>*/}
            {/*</div>*/}
            {/*<div className='user-detail-row'>*/}
            {/*<p> {translate["Education Experience"]}</p>*/}
            {/*<p className='user-detail-value'>گرایش مهندسی برق</p>*/}
            {/*</div>*/}
            {/*</React.Fragment> : */}
            {/*<React.Fragment>*/}
            {/*<div className='user-detail-row'>*/}
            {/*<p>{translate["Employees"]}</p>*/}
            {/*<p className='user-detail-value'>{`${organization.staff_count ? organization.staff_count : 0} نفر`}</p>*/}
            {/*</div>*/}
            {/*<div className='user-detail-row'>*/}
            {/*<p>{translate["Customers"]}</p>*/}
            {/*<p className='user-detail-value'>{`2 ${translate["Customer"]}`}</p>*/}
            {/*</div>*/}
            {/*<div className='user-detail-row'>*/}
            {/*<p>{translate["Certificate"]}</p>*/}
            {/*<p className='user-detail-value'>{`2 ${translate["Certificate"]} ${translate["And"]} 5 ${translate["Badge"]}`}</p>*/}
            {/*</div>*/}
            {/*</React.Fragment>*/}
            {/*}*/}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const identityId = state.auth.client.identity.content
  const identity = state.identities.list[identityId]
  const profileMediaId = identity.profile_media
  const bannerMediaId = identity.profile_banner


  return {
    translate: getMessages(state),
    identity,
    profileImage: state.common.file.list[profileMediaId],
    bannerImage: state.common.file.list[bannerMediaId],
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFile: FileActions.getFile
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPanel)