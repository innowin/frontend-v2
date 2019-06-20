import React, {PureComponent} from 'react'
import {REST_URL} from 'src/consts/URLS'
import urls from 'src/consts/URLS'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {ClipLoader} from 'react-spinners'
import UserDetailPanel from '../common/components/UserDetailPanel'
import constants from '../../consts/constants'
import {DefaultOrganIcon, DefaultUserIcon} from '../../images/icons'

class Notifications extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
      oldNotifications: [],
      loading: true,
    }

    this.seenNotif = this.seenNotif.bind(this)
  }


  componentDidMount() {
    this.getData()
  }

  getData() {
    const {token} = this.props
    fetch(REST_URL + '/' + urls.COMMON.NOTIFICATIONS, {
      headers: {'Authorization': `JWT ${token}`},
    })
        .then(res => res.json())
        .then(resJson => {
          const result = resJson.results.filter(notif => notif.notification_from_identity && notif.notification_html_payload)
          this.setState({
            ...this.state,
            notifications: result.filter(notif => !notif.notification_seen),
            oldNotifications: result.filter(notif => notif.notification_seen),
            loading: false,
          })
        })
        .catch((err) => console.log(err))
  }

  seenNotif() {
    if (this.state.notifications.length > 0) {
      const {token} = this.props
      fetch(REST_URL + '/' + urls.COMMON.NOTIFICATIONS_SEEN + '/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({
          last_notif: this.state.notifications[0].id,
        }),
      })
          .then((res) => res.json())
          .then((resJson) => {
            console.log(resJson)
            this.getData()
          })
    }
  }

  render() {
    const {notifications, oldNotifications, loading} = this.state
    return (
        <div className='notif-parent'>
          <section className='notifications-sidebar'>
            <UserDetailPanel/>
          </section>
          <main className='product-container'>
            <div className='notifications-container'>

              <div className='notifications-new-section'>
                <div className='notifications-header'>
                  <div>اعلان های جدید</div>
                  <div className='notifications-read' onClick={this.seenNotif}>Make Read</div>
                </div>
                <div className='notifications-content'>
                  {
                    loading ?
                        <div className='notifications-content-loading'><ClipLoader color='grey'/></div>
                        :
                        notifications.length > 0 ? notifications.map((notif, index) =>
                                <div key={index} className='notifications-item'>
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
                                    __html: notif.notification_html_payload
                                        .replace(new RegExp('http://innowin.ir', 'g'), '')
                                        .replace(new RegExp('https://innowin.ir', 'g'), '')
                                        .replace(new RegExp('<a ', 'g'), '<a target=_blank '),
                                  }}/>

                                  <div className='notifications-item-time'><Moment element='span' fromNow ago>{notif.created_time}</Moment><span> پیش</span></div>
                                </div>,
                            )
                            :
                            <div className='notifications-item'>اعلان جدیدی وجود ندارد.</div>
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
                              __html: notif.notification_html_payload
                                  .replace(new RegExp('http://innowin.ir', 'g'), '')
                                  .replace(new RegExp('https://innowin.ir', 'g'), '')
                                  .replace(new RegExp('<a ', 'g'), '<a target=_blank '),
                            }}/>

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