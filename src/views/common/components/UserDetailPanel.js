import * as React from 'react'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {connect} from 'react-redux'
import {DefaultOrganIcon, DefaultUserIcon} from 'src/images/icons'
import {Link} from 'react-router-dom'
import constants from 'src/consts/constants'

const UserDetailPanel = (props) => {
  const {identity} = props
  if (identity) {
    const {profile_media, profile_banner} = identity
    const isUser = identity.identity_type === constants.USER_TYPES.USER
    const name = isUser
        ? !(identity.first_name || identity.last_name) ? '' : (identity.first_name + ' ' + identity.last_name)
        : identity.nike_name || identity.official_name

    return (
        <div className='user-detail-panel-container'>
          <div className='image-part-container'>
            {
              profile_banner ?
                  <img className='banner covered-img' alt="profile banner" src={profile_banner.file}/>
                  :
                  <div className='banner covered-img background-strips'/>
            }
            {
              profile_media ?
                  <Link to={isUser ? `/user/${identity.id}` : `/organization/${identity.id}`}>
                    <img className="rounded-circle profile-media covered-img" alt="profile" src={profile_media.file}/>
                  </Link>
                  :
                  <Link to={isUser ? `/user/${identity.id}` : `/organization/${identity.id}`}>
                    {
                      isUser ?
                          <DefaultUserIcon className="rounded-circle profile-media covered-img"/>
                          :
                          <div className='organ-profile-container'>
                            <DefaultOrganIcon className='organ-default covered-img'/>
                          </div>
                    }
                  </Link>
            }
          </div>

          <div className='user-detail-body'>
            <div className='user-detail-row'>
              <p className='user-detail-label user-detail-username'>{name}</p>
              <p className='user-detail-value user-detail-username-value'>@{identity.nike_name || identity.username}</p>
            </div>
          </div>
        </div>
    )
  }
  else return null
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