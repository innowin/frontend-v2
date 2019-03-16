import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import Material from '../../common/components/Material'
import socialActions from '../../../redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {Component} from 'react'
import {DefaultUserIcon, Organization, User as UserIcon} from 'src/images/icons'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import constants from 'src/consts/constants'
import getFile from 'src/redux/actions/commonActions/fileActions'

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: any,
      identities: Object,
      user: Object,
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
          checkMedia: true,
        }
    const self: any = this
    self._follow = this._follow.bind(this)
  }

  componentDidMount() {
    const {data, actions} = this.props
    if (data.profile_banner) {
      actions.getFile(data.profile_banner)
    }
    if (data.profile_media) {
      actions.getFile(data.profile_media)
    }
    // if (data.profile_banner && data.profile_banner.file) {
    //   let banner = new Image()
    //   banner.src = data.profile_banner.file.includes('innowin.ir') ? data.profile_banner.file : REST_URL + data.profile_banner.file
    //   banner.onload = () => {
    //     this.setState({...this.state, bannerLoaded: true})
    //   }
    // }
    //
    // if (data.profile_media && data.profile_media.file) {
    //   let profile = new Image()
    //   profile.src = data.profile_media.file.includes('innowin.ir') ? data.profile_media.file : REST_URL + data.profile_media.file
    //   profile.onload = () => {
    //     this.setState({...this.state, profileLoaded: true})
    //   }
    // }
  }

  _follow() {
    const {identities, actions, currentUser, data} = this.props
    this.setState({followLoading: true}, () => {
      if (identities[data.id] && identities[data.id].id) {
        const formValues = {follow_follower: currentUser.id, follow_followed: identities[data.id].id}
        actions.follow({formValues, followOwnerId: currentUser.id})
      }
    })
  }

  _renderFollowed(data, followees) {
    const {followLoading} = this.state
    const {translate} = this.props
    if (followees[data.id]) {
      return <Material className='user-follow' content={translate['Followed']}/>
    }
    else if (followLoading) {
      return <Material className='user-follow-loading' content={<ClipLoader color='#008057' size={19}/>}/>
    }
    else return <Material className='user-followed' content={translate['Follow']} onClick={this._follow}/>
  }

  render() {
    const {data: user, followees, files} = this.props
    const {badges} = user.badges || []
    const userId = user.id
    const userType = user.identity_type

    return (
        <div className='users-explore'>
          <Link to={userType === constants.USER_TYPES.ORG ? `/organization/${userId}` : `/user/${userId}`} style={{textDecoration: 'none', color: 'black'}}>
            {
              user.profile_banner && files[user.profile_banner] ?
                  <img src={files[user.profile_banner].file}
                       className='user-banner' alt={user.last_name}/>
                  :
                  <div className='user-banner'/>
            }
            {
              user.profile_media && files[user.profile_media] ?
                  <img src={files[user.profile_media].file}
                       className='user-profile-photo' alt={user.last_name}/>
                  :
                  <DefaultUserIcon className='user-default-profile-photo'/>
            }

            <div className='user-name-id-cont'>
              <div className='user-name'>
                {
                  userType === constants.USER_TYPES.USER ?
                      <UserIcon className='user-name-icon'/>
                      : <Organization className='user-name-icon'/>
                }
                {user.first_name + ' ' + user.last_name}</div>
              <div className='user-id'>@{user.username}</div>
            </div>

            <div className='user-description'
                 style={new RegExp('^[A-Za-z]*$').test(user && user.description && user.description[0]) ? {direction: 'ltr'} : {direction: 'rtl'}}>
              {user.description}
            </div>

            <div className='user-baj-container'>
              {
                badges && badges.map((badge, i) =>
                    <img key={i} src={badge.badge_related_badge_category.badge_related_media.file} className='user-baj' alt='badge'/>,
                )
              }
            </div>
          </Link>
          {
            this._renderFollowed(user, followees)
          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const id = state.auth.client.identity.content
  const currentUser = state.identities.list[id]
  return {
    currentUser,
    identities: state.identities.list,
    translate: getMessages(state),
    files: state.common.file.list,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    follow: socialActions.createFollow,
    getFile: getFile.getFile,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
