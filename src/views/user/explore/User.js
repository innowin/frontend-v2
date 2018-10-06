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
    const {data} = this.props
    return (
        <div className='users-explore'>
          <img className='user-banner' src={data.banner}/>
          {data.profile_photo ?
              <img src={data.profile_photo} alt={data.last_name} className='user-profile-photo'/>
              :
              <DefaultUserIcon className='user-default-profile-photo'/>
          }

          <div>
            <div className='user-name'>{data.first_name + ' ' + data.last_name}</div>
            <div className='user-id'>@{data.username}</div>
          </div>

          <div className='user-description'>
            {data.description}
          </div>

          <div className='user-baj-container'>
            <DefaultUserIcon className='user-baj'/>
            <DefaultUserIcon className='user-baj'/>
            <DefaultUserIcon className='user-baj'/>
          </div>

          {data.is_following ?
            <button className='user-follow'>دنبال شده</button>
              :
            <button className='user-followed'>دنبال کردن</button>
          }

        </div>
    )
  }
}

export default User
