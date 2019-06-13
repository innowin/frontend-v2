import React, {Component} from 'react'
import {REST_URL} from 'src/consts/URLS'
import urls from 'src/consts/URLS'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {ClipLoader} from 'react-spinners'
import UserDetailPanel from '../common/components/UserDetailPanel'
import constants from '../../consts/constants'
import {DefaultOrganIcon, DefaultUserIcon} from '../../images/icons'

class Notifications extends Component {

  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
      oldNotifications: [],
      loading: true,
    }
  }


  componentDidMount() {
    const {token} = this.props
    fetch(REST_URL + '/' + urls.COMMON.NOTIFICATIONS, {
      headers: {
        'Authorization': `JWT ${token}`,
      },
    })
        .then(res => res.json())
        .then(resJson => {
          const result = resJson.results.filter(notif => notif.notification_from_identity && notif.notification_payload).reverse()
          this.setState({
            ...this.state,
            notifications: result.filter(notif => !notif.notification_seen),
            oldNotifications: result.filter(notif => notif.notification_seen),
            loading: false,
          })
        })
  }

  render() {
    const {notifications, oldNotifications, loading} = this.state
    return (
        <div className='all-products-parent'>
          <section className='notifications-sidebar'>
            <UserDetailPanel/>
          </section>
          <main className='product-container'>
            <div className='notifications-container'>

              <div className='notifications-new-section'>
                <div className='notifications-header'>
                  <div>اعلان های جدید</div>
                  <div className='notifications-read'>Make Read</div>
                </div>
                <div className='notifications-content'>
                  {
                    loading ?
                        <div className='notifications-content-loading'><ClipLoader color='grey'/></div>
                        :
                        notifications.length > 0 ? notifications.map((notif, index) =>
                                <div key={index} className='notifications-item'>
                                  <div>
                                    {
                                      notif.notification_from_identity.profile_media_url ?
                                          <img src={notif.notification_from_identity.profile_media_url} className='notifications-item-img' alt=''/>
                                          :
                                          notif.notification_from_identity.identity_type === constants.USER_TYPES.USER ?
                                              <div className='default-notif-img'>
                                                <DefaultUserIcon className='default-notif-profile-photo'/>
                                              </div>
                                              :
                                              <div className='default-notif-img'>
                                                <DefaultOrganIcon className='default-notif-profile-photo'/>
                                              </div>
                                    }
                                    <div className='notifications-item-text' dangerouslySetInnerHTML={{
                                      __html: notif.notification_payload
                                          .replace(new RegExp('http://innowin.ir', 'g'), '')
                                          .replace(new RegExp('https://innowin.ir', 'g'), '')
                                          .replace(new RegExp('<a ', 'g'), '<a target=_blank '),
                                    }}/>
                                  </div>

                                  <div className='notifications-item-time'><Moment element='span' fromNow ago>{notif.created_time}</Moment><span> پیش</span></div>
                                </div>,
                            )
                            :
                            <div>اعلان جدیدی وجود ندارد.</div>
                  }
                </div>
              </div>

              {
                oldNotifications.length > 0 &&
                <div className='notifications-old-section'>
                  <div className='notifications-header'>
                    <div>اعلان های خوانده شده</div>
                    <div className='notifications-read'>پاک کردن</div>
                  </div>
                  <div className='notifications-content'>
                    {
                      oldNotifications.map((notif, index) =>
                          <div key={index} className='notifications-item'>
                            <div>
                              {
                                notif.notification_from_identity.profile_media_url ?
                                    <img src={notif.notification_from_identity.profile_media_url} className='notifications-item-img' alt=''/>
                                    :
                                    notif.notification_from_identity.identity_type === constants.USER_TYPES.USER ?
                                        <div className='default-notif-img'>
                                          <DefaultUserIcon className='default-notif-profile-photo'/>
                                        </div>
                                        :
                                        <div className='default-notif-img'>
                                          <DefaultOrganIcon className='default-notif-profile-photo'/>
                                        </div>
                              }
                              <div className='notifications-item-text' dangerouslySetInnerHTML={{
                                __html: notif.notification_payload
                                    .replace(new RegExp('http://innowin.ir', 'g'), '')
                                    .replace(new RegExp('https://innowin.ir', 'g'), '')
                                    .replace(new RegExp('<a ', 'g'), '<a target=_blank '),
                              }}/>
                            </div>

                            <div className='notifications-item-time'><Moment element='span' fromNow ago>{notif.created_time}</Moment><span> پیش</span></div>
                          </div>,
                      )
                    }
                  </div>
                </div>
              }

            </div>
          </main>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.client.token,
})

export default connect(mapStateToProps, null)(Notifications)