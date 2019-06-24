// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {connect} from 'react-redux'
import {DefaultOrganIcon, DefaultUserIcon} from 'src/images/icons'
import {Link} from 'react-router-dom'
import type {identityType} from 'src/consts/flowTypes/identityType'
import constants from '../../../consts/constants'

type UserDetailPanelProps = {
  translate: { [string]: string },
  identity: identityType,
}

type UserDetailPanelStates = {
  bannerLoaded: boolean,
  profileLoaded: boolean,
}

class UserDetailPanel extends React.Component<UserDetailPanelProps, UserDetailPanelStates> {
  constructor(props) {
    super(props)
    this.state = {
      bannerLoaded: false,
      profileLoaded: false,
    }
  }

  static propTypes = {
    translate: PropTypes.object.isRequired,
    identity: PropTypes.object,
  }


  componentDidMount() {
    const {identity} = this.props
    const {profile_media, profile_banner} = identity

    //Added for profile url check
    if (profile_media && profile_media.file) {
      let profile = new Image()
      profile.src = profile_media.file
      profile.onload = () => {
        this.setState({...this.state, profileLoaded: true})
      }
    }
    if (profile_banner && profile_banner.file) {
      let profile = new Image()
      profile.src = profile_banner.file
      profile.onload = () => {
        this.setState({...this.state, bannerLoaded: true})
      }
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.identity.profile_media !== nextProps.identity.profile_media || this.props.identity.profile_banner !== nextProps.identity.profile_banner) {

      const {identity} = this.props
      const {profile_media, profile_banner} = identity

      //Added for profile url check
      if (profile_media && profile_media.file) {
        let profile = new Image()
        profile.src = profile_media.file
        profile.onload = () => {
          this.setState({...this.state, profileLoaded: true})
        }
      }
      if (profile_banner && profile_banner.file) {
        let profile = new Image()
        profile.src = profile_banner.file
        profile.onload = () => {
          this.setState({...this.state, bannerLoaded: true})
        }
      }
    }
  }

  render() {
    const {bannerLoaded, profileLoaded} = this.state
    const {identity} = this.props
    const {profile_media, profile_banner} = identity
    const isUser = identity.identity_type === constants.USER_TYPES.USER
    const name = isUser
        ? !(identity.first_name || identity.last_name) ? '' : (identity.first_name + ' ' + identity.last_name)
        : identity.nike_name || identity.official_name

    return (
        <div className='user-detail-panel-container'>
          <div className='image-part-container'>

            {
              profile_banner && profile_banner.file && bannerLoaded
                  ? <img className='banner covered-img' alt="profile banner" src={profile_banner.file}/>
                  : <div className='banner covered-img background-strips'/>
            }
            {
              profile_media && profile_media.file && profileLoaded ?
                  <Link to={isUser ? `/user/${identity.id}` : `/organization/${identity.id}`}>
                    <img className="rounded-circle profile-media covered-img" alt="profile" src={profile_media.file}/>
                  </Link>
                  :
                  <Link to={isUser ? `/user/${identity.id}` : `/organization/${identity.id}`}>
                    {isUser
                        ? <DefaultUserIcon className="rounded-circle profile-media covered-img"/>
                        : <div className='organ-profile-container'>
                          <DefaultOrganIcon className='organ-default covered-img'/>
                        </div>
                    }
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

const mapStateToProps = (state) => {
  const identityId = state.auth.client.identity.content
  const identity = state.identities.list[identityId]

  return {
    translate: getMessages(state),
    identity,
  }
}


export default connect(mapStateToProps, null)(UserDetailPanel)