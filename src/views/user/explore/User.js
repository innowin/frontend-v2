// @flow
import * as React from 'react'
import {Component} from 'react'
import {DefaultUserIcon} from "src/images/icons"
import {bindActionCreators} from "redux"
import identityActions from "../../../redux/actions/identityActions"
import connect from "react-redux/es/connect/connect"
import socialActions from "../../../redux/actions/commonActions/socialActions"
import {ClipLoader} from "react-spinners"
import {Link} from "react-router-dom"
import {REST_URL} from 'src/consts/URLS'

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: any
    |}

type appState =
    {||}

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

    this.follow = this.follow.bind(this)
  }

  follow() {
    this.setState({followLoading: true}, () => {
      if (this.props.identities[this.props.data.user.id] && this.props.identities[this.props.data.user.id].identity && this.props.identities[this.props.data.user.id].identity.content) {
        const formValues = {follow_follower: this.props.currentUserIdentity, follow_followed: this.props.identities[this.props.data.user.id].identity.content}
        this.props.actions.follow({formValues, followOwnerId: this.props.currentUserId, followOwnerType: this.props.currentUserType})
      }
      else {
        this.setState({...this.state, follow: true})
        this.props.actions.getUserIdentity(this.props.data.user.id)
      }
    })
  }

  componentDidMount() {
    if (this.props.data.profile.profile_banner) {
      let banner = new Image()
      banner.src = REST_URL + this.props.data.profile.profile_banner.file
      banner.onload = () => {
        this.setState({...this.state, bannerLoaded: true})
      }
    }

    if (this.props.data.profile.profile_media) {
      let profile = new Image()
      profile.src = REST_URL + this.props.data.profile.profile_media.file
      profile.onload = () => {
        this.setState({...this.state, profileLoaded: true})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.follow && (nextProps.identities[this.props.data.user.id] && nextProps.identities[this.props.data.user.id].identity && nextProps.identities[this.props.data.user.id].identity.content)) {
      this.setState({...this.state, follow: false}, () => {
        const formValues = {follow_follower: this.props.currentUserIdentity, follow_followed: nextProps.identities[this.props.data.user.id].identity.content}
        this.props.actions.follow({formValues, followOwnerId: this.props.currentUserId, followOwnerType: this.props.currentUserType})
      })
    }

    if (this.props.data.user.id !== nextProps.data.user.id) {
      this.setState({...this.state, bannerLoaded: false, profileLoaded: false}, () => {
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
    }
  }

  renderFollowed(data, followees) {
    if (followees[data.user.id]) {
      return <button className='user-follow'>دنبال شده</button>
    }
    else if (this.state.followLoading) {
      return <div className='user-follow-loading'><ClipLoader color='#008057' size={19}/></div>
    }
    else return <button className='user-followed' onClick={this.follow}>دنبال کردن</button>
  }

  render() {
    const {data, followees} = this.props
    const {profileLoaded, bannerLoaded} = this.state
    return (
        <div className='users-explore'>
          <Link to={`/user/${data.user.id}`} style={{textDecoration: 'none', color: 'black'}}>
            {
              data.profile.profile_banner && bannerLoaded ?
                  <img src={REST_URL + data.profile.profile_banner.file} className='user-banner' alt={data.user.last_name}/>
                  :
                  <div className='user-banner'/>
            }
            {
              data.profile.profile_media && profileLoaded ?
                  <img src={REST_URL + data.profile.profile_media.file} className='user-profile-photo' alt={data.user.last_name}/>
                  :
                  <DefaultUserIcon className='user-default-profile-photo'/>
            }

            <div>
              <div className='user-name'>{data.user.first_name + ' ' + data.user.last_name}</div>
              <div className='user-id'>@{data.user.username}</div>
            </div>

            <div className='user-description' style={new RegExp("^[A-Za-z]*$").test(data.profile.description[0]) ? {direction: 'ltr'} : {direction: 'rtl'}}>
              {data.profile.description}
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
            this.renderFollowed(data, followees)
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
