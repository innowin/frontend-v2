// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import identityActions from '../../../redux/actions/identityActions'
import Material from '../../common/components/Material'
import socialActions from '../../../redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {Component} from 'react'
import {DefaultUserIcon, Organization, User as UserIcon} from 'src/images/icons'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import {REST_URL} from 'src/consts/URLS'
import GetUserActions from 'src/redux/actions/user/getUserActions'

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: any,
      identities: Object,
      currentUserIdentity: Object,
      currentUserId: Object,
      currentUserType: Object,
      followees: Object,
      translate: { [string]: string }
    |}

type appState =
    {|
      follow: boolean,
      followLoading: boolean,
      profileLoaded: boolean,
      bannerLoaded: boolean,
      checkMedia: boolean
    |}

class User extends Component <appProps, appState> {
  constructor(props) {
    super(props)
    this.state =
        {
          follow: false,
          followLoading: false,
          profileLoaded: false,
          bannerLoaded: false,
          checkMedia: true
        }
    const self: any = this
    self._follow = this._follow.bind(this)
  }

  componentDidMount() {
    const {data} = this.props

    // if (data.profile.content.related_organization_id) {
    //   console.log('org')
    //   actions.getProfileByUserId(data.profile.content.id)
    // }

    if (data.profile.content.profile_banner && data.profile.content.profile_banner.file) {
      let banner = new Image()
      banner.src = data.profile.content.profile_banner.file.includes('innowin.ir') ? data.profile.content.profile_banner.file : REST_URL + data.profile.content.profile_banner.file
      banner.onload = () => {
        this.setState({...this.state, bannerLoaded: true})
      }
    }

    if (data.profile.content.profile_media && data.profile.content.profile_media.file) {
      let profile = new Image()
      profile.src = data.profile.content.profile_media.file.includes('innowin.ir') ? data.profile.content.profile_media.file : REST_URL + data.profile.content.profile_media.file
      profile.onload = () => {
        this.setState({...this.state, profileLoaded: true})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {data, currentUserType, currentUserId, currentUserIdentity, actions} = this.props
    const {follow} = this.state

    if (data.profile.content.profile_user.id !== nextProps.data.profile.content.profile_user.id) {
      this.setState({...this.state, bannerLoaded: false, profileLoaded: false, follow: false, followLoading: false}, () => {
        if (nextProps.data.profile.content.profile_banner) {
          let banner = new Image()
          banner.src = nextProps.data.profile.content.profile_banner.file.includes('innowin.ir') ? nextProps.data.profile.content.profile_banner.file : REST_URL + nextProps.data.profile.content.profile_banner.file
          banner.onload = () => {
            this.setState({...this.state, bannerLoaded: true})
          }
        }

        if (nextProps.data.profile.content.profile_media) {
          let profile = new Image()
          profile.src = nextProps.data.profile.content.profile_media.file.includes('innowin.ir') ? nextProps.data.profile.content.profile_media.file : REST_URL + nextProps.data.profile.content.profile_media.file
          profile.onload = () => {
            this.setState({...this.state, profileLoaded: true})
          }
        }
      })
    }
    else if (follow && (nextProps.identities[data.profile.content.profile_user.id] && nextProps.identities[data.profile.content.profile_user.id].identity && nextProps.identities[data.profile.content.profile_user.id].identity.content)) {
      this.setState({...this.state, follow: false}, () => {
        const formValues = {follow_follower: currentUserIdentity, follow_followed: nextProps.identities[data.profile.content.profile_user.id].identity.content}
        actions.follow({formValues, followOwnerId: currentUserId, followOwnerType: currentUserType})
      })
    }
  }

  _follow() {
    const {identities, actions, currentUserIdentity, currentUserId, currentUserType, data} = this.props
    this.setState({followLoading: true}, () => {
      if (identities[data.profile.content.profile_user.id] && identities[data.profile.content.profile_user.id].identity && identities[data.profile.content.profile_user.id].identity.content) {
        const formValues = {follow_follower: currentUserIdentity, follow_followed: identities[data.profile.content.profile_user.id].identity.content}
        actions.follow({formValues, followOwnerId: currentUserId, followOwnerType: currentUserType})
      }
      else {
        this.setState({...this.state, follow: true})
        actions.getUserIdentity(data.profile.content.profile_user.id)
      }
    })
  }

  _renderFollowed(data, followees) {
    const {followLoading} = this.state
    const {translate} = this.props
    if (followees[data.profile.content.profile_user.id]) {
      return <Material className='user-follow' content={translate['Followed']}/>
    }
    else if (followLoading) {
      return <Material className='user-follow-loading' content={<ClipLoader color='#008057' size={19}/>}/>
    }
    else return <Material className='user-followed' content={translate['Follow']} onClick={this._follow}/>
  }

  render() {
    const {data, followees} = this.props
    const profile = data.profile.content
    const {badges} = data.badges || []
    const user = data.profile.content.profile_user
    const {profileLoaded, bannerLoaded} = this.state
    const organId = profile["related_organization_id"]

    return (
        <div className='users-explore'>
          <Link to={organId ? `/organization/${organId}` : `/user/${user.id}`} style={{textDecoration: 'none', color: 'black'}}>
            {
              profile.profile_banner && bannerLoaded ?
                  <img src={profile.profile_banner.file.includes('innowin.ir') ? profile.profile_banner.file : REST_URL + profile.profile_banner.file} className='user-banner' alt={user.last_name}/>
                  :
                  <div className='user-banner'/>
            }
            {
              profile.profile_media && profileLoaded ?
                  <img src={profile.profile_media.file.includes('innowin.ir') ? profile.profile_media.file : REST_URL + profile.profile_media.file} className='user-profile-photo' alt={user.last_name}/>
                  :
                  <DefaultUserIcon className='user-default-profile-photo'/>
            }

            <div className='user-name-id-cont'>
              <div className='user-name'>{organId ? <Organization className='user-name-icon'/> : <UserIcon className='user-name-icon'/>}{user.first_name + ' ' + user.last_name}</div>
              <div className='user-id'>@{user.username}</div>
            </div>

            <div className='user-description' style={new RegExp('^[A-Za-z]*$').test(profile.description[0]) ? {direction: 'ltr'} : {direction: 'rtl'}}>
              {profile.description}
            </div>

            <div className='user-baj-container'>
              {
                badges && badges.map((badge, i) =>
                    <img key={i} src={badge.badge_related_badge_category.badge_related_media.file} className='user-baj' alt='badge'/>
                )
              }
            </div>
          </Link>
          {
            this._renderFollowed(data, followees)
          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const userId = state.auth.client.organization ? state.auth.client.organization.id : state.auth.client.user.id
  return {
    currentUserType: state.auth.client.user_type,
    currentUserIdentity: state.auth.client.identity.content,
    currentUserId: userId,
    identities: state.users.list,
    translate: getMessages(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getUserIdentity: identityActions.getUserIdentity,
    getOrgIdentity: identityActions.getOrgIdentity,
    follow: socialActions.createFollow,
    getProfileByUserId: GetUserActions.getProfileByUserId
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
