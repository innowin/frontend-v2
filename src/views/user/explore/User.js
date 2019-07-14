import React, {PureComponent} from 'react'
import connect from 'react-redux/es/connect/connect'
import Material from '../../common/components/Material'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {DefaultOrganIcon, DefaultUserIcon, Organization, User as UserIcon} from 'src/images/icons'
import {Link} from 'react-router-dom'
import constants from 'src/consts/constants'

class User extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      follow: false,
      followLoading: false,
      profileLoaded: false,
      bannerLoaded: false,
      checkMedia: true,
    }
    this._follow = this._follow.bind(this)
    this._unFollow = this._unFollow.bind(this)
  }

  _follow() {
    const {actions, currentUser, data} = this.props
    this.setState({followLoading: true}, () => {
      const formValues = {follow_follower: currentUser, follow_followed: data.id}
      actions.follow({formValues, followOwnerId: currentUser})
    })
  }

  _unFollow() {
    const {actions, followees, data, currentUser} = this.props
    this.setState({followLoading: false}, () => {
      actions.unFollow({followId: followees[data.id].id, followOwnerId: currentUser})
    })
  }

  render() {
    const {data: user, followees, translate, currentUser} = this.props
    const {followLoading} = this.state
    const {badges} = user.badges || []
    const userId = user.id
    const userType = user.identity_type

    return (
        <div className='users-explore'>
          <Link to={userType === constants.USER_TYPES.ORG ? `/organization/${userId}` : `/user/${userId}`} style={{textDecoration: 'none', color: 'black'}}>
            {
              user.profile_banner ?
                  <img src={user.profile_banner.file} className='user-banner-bg' alt={user.last_name}/>
                  :
                  <div className='user-banner-bg'/>
            }
            {
              user.profile_media ?
                  <img src={user.profile_media.file} className='user-profile-photo' alt={user.last_name}/>
                  :
                  userType === constants.USER_TYPES.USER ?
                      <div className='default-skelete-skeleton-img'>
                        <DefaultUserIcon className='default-skelete-profile-photo'/>
                      </div>
                      :
                      <div className='default-skelete-skeleton-img'>
                        <DefaultOrganIcon className='default-org-skelete-profile-photo'/>
                      </div>
            }

            <div className='user-name-id-cont'>
              <div className='user-name'>
                <span>
                {
                  userType === constants.USER_TYPES.USER ?
                      <UserIcon className='user-name-icon'/>
                      : <Organization className='user-name-icon-org'/>
                }
                </span>
                {user.last_name ? (user.first_name + ' ' + user.last_name) : (user.username)}
              </div>
              <div className='user-id'>@{user.username}</div>
            </div>

            <div className='user-description' style={user.description ? {direction: new RegExp('^[A-Za-z]*$').test(user.description) ? 'ltr' : 'rtl'} : {display: 'none'}}>
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
            currentUser ?
                followees[user.id] ? <Material className='user-follow' content=' ' onClick={this._unFollow}/>
                    :
                    followLoading ? <Material className='user-follow-loading' content={<ClipLoader color='#008057' size={19}/>}/>
                        :
                        <Material className='user-followed' content={translate['Follow']} onClick={this._follow}/>
                :
                null
          }

        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    follow: socialActions.createFollow,
    unFollow: socialActions.deleteFollow,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(User)
