// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import identityActions from '../../../redux/actions/identityActions'
import Material from '../../common/components/Material'
import socialActions from '../../../redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {Component} from 'react'
import {DefaultUserIcon} from 'src/images/icons'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import {REST_URL} from 'src/consts/URLS'

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
    if (data.profile.profile_banner) {
      let banner = new Image()
      banner.src = REST_URL + data.profile.profile_banner.file
      banner.onload = () => {
        this.setState({...this.state, bannerLoaded: true})
      }
    }

    if (data.profile.profile_media) {
      let profile = new Image()
      profile.src = REST_URL + data.profile.profile_media.file
      profile.onload = () => {
        this.setState({...this.state, profileLoaded: true})
      }
    }
  }

  componentWillReceiveProps(nextProps) {

    const {data, currentUserType, currentUserId, currentUserIdentity, actions} = this.props
    const {follow} = this.state

    if (data.user.id !== nextProps.data.user.id) {
      this.setState({...this.state, bannerLoaded: false, profileLoaded: false, follow: false, followLoading: false}, () => {
        if (nextProps.data.profile.profile_banner) {
          let banner = new Image()
          banner.src = REST_URL + nextProps.data.profile.profile_banner.file
          banner.onload = () => {
            this.setState({...this.state, bannerLoaded: true})
          }
        }

        if (nextProps.data.profile.profile_media) {
          let profile = new Image()
          profile.src = REST_URL + nextProps.data.profile.profile_media.file
          profile.onload = () => {
            this.setState({...this.state, profileLoaded: true})
          }
        }
      })
    } else if (follow && (nextProps.identities[data.user.id] && nextProps.identities[data.user.id].identity && nextProps.identities[data.user.id].identity.content)) {
      this.setState({...this.state, follow: false}, () => {
        const formValues = {follow_follower: currentUserIdentity, follow_followed: nextProps.identities[data.user.id].identity.content}
        actions.follow({formValues, followOwnerId: currentUserId, followOwnerType: currentUserType})
      })
    }
  }

  _follow() {
    const {identities, actions, currentUserIdentity, currentUserId, currentUserType, data} = this.props
    this.setState({followLoading: true}, () => {
      if (identities[data.user.id] && identities[data.user.id].identity && identities[data.user.id].identity.content) {
        const formValues = {follow_follower: currentUserIdentity, follow_followed: identities[data.user.id].identity.content}
        actions.follow({formValues, followOwnerId: currentUserId, followOwnerType: currentUserType})
      } else {
        this.setState({...this.state, follow: true})
        actions.getUserIdentity(data.user.id)
      }
    })
  }

  _renderFollowed(data, followees) {
    const {followLoading} = this.state
    const {translate} = this.props
    if (followees[data.user.id]) {
      return <Material className='user-follow' content={translate['Followed']}/>
    } else if (followLoading) {
      return <Material className='user-follow-loading' content={<ClipLoader color='#008057' size={19}/>}/>
    } else return <Material className='user-followed' content={translate['Follow']} onClick={this._follow}/>
  }

  render() {
    const {data, followees} = this.props
    const {profile} = data
    const {profileLoaded, bannerLoaded} = this.state
    return (
        <div className='users-explore'>
          <Link to={`/user/${data.user.id}`} style={{textDecoration: 'none', color: 'black'}}>
            {
              profile.profile_banner && bannerLoaded ?
                  <img src={REST_URL + profile.profile_banner.file} className='user-banner' alt={data.user.last_name}/>
                  :
                  <div className='user-banner'/>
            }
            {
              profile.profile_media && profileLoaded ?
                  <img src={REST_URL + profile.profile_media.file} className='user-profile-photo' alt={data.user.last_name}/>
                  :
                  <DefaultUserIcon className='user-default-profile-photo'/>
            }

            <div className='user-name-id-cont'>
              <div className='user-name'>{data.user.first_name + ' ' + data.user.last_name}</div>
              <div className='user-id'>@{data.user.username}</div>
            </div>

            <div className='user-description' style={new RegExp('^[A-Za-z]*$').test(profile.description[0]) ? {direction: 'ltr'} : {direction: 'rtl'}}>
              {profile.description}
            </div>

            <div className='user-baj-container'>
              {
                data.badges.map((badge, i) =>
                    <img key={i} src={REST_URL + badge.badge_related_badge_category.badge_related_media.file} className='user-baj' alt='badge'/>
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
    translate: getMessages(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getUserIdentity: identityActions.getUserIdentity,
    getOrgIdentity: identityActions.getOrgIdentity,
    follow: socialActions.createFollow,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
