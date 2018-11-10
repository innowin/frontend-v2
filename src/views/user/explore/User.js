// @flow
import * as React from 'react'
import {Component} from 'react'
import {DefaultUserIcon} from "src/images/icons"

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: any
    |}

type appState =
    {||}

class User extends Component <appProps, appState> {
  render() {
    const {data, followees} = this.props
    return (
        <div className='users-explore'>
          {
            data.profile.profile_banner !== null ?
                <img src={'https://restful.daneshboom.ir/' + data.profile.profile_banner.file} className='user-banner' alt={data.user.last_name}/>
                :
                <img src='https://restful.daneshboom.ir//media/3f366e481437444d8f8cdd5afb528360.jpg' className='user-banner' alt={data.user.last_name}/>
          }
          {data.profile.profile_media !== null ?
              <img src={'https://restful.daneshboom.ir/' + data.profile.profile_media.file} className='user-profile-photo' alt={data.user.last_name}/>
              :
              <DefaultUserIcon className='user-default-profile-photo'/>
          }

          <div>
            <div className='user-name'>{data.user.first_name + ' ' + data.user.last_name}</div>
            <div className='user-id'>@{data.user.username}</div>
          </div>

          <div className='user-description'>
            {data.profile.description}
          </div>

          <div className='user-baj-container'>
            {
              data.badges.map(badge =>
                  <img src={'https://restful.daneshboom.ir/' + badge.badge_related_badge_category.badge_related_media.file} className='user-baj' alt='badge'/>
              )
            }
          </div>

          {followees[data.user.id] !== undefined ?
              <button className='user-follow'>دنبال شده</button>
              :
              <button className='user-followed'>دنبال کردن</button>
          }
        </div>
    )
  }
}

export default User
