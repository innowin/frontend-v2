// @flow
import * as React from 'react'
import User from './User'
import UserSkeleton from './User_Skeleton'
import constants from '../../../consts/constants'
import type {identityType} from '../../../consts/flowTypes/identityType'

type appProps =
    {|
      users: Array<identityType>,
      justUsers: Array<identityType>,
      justOrgans: Array<identityType>,
      followees: Object,
      followers: Object,
      justFollowing: boolean,
      justFollowed: boolean,
      loading: boolean
    |}

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Users = (props: appProps) => {
  let {users, followees, followers, justFollowing, justFollowed, justUsers, justOrgans} = props

  let usersArr = Object.values(users).filter(user => user.id)

  let usersObj = {}

  if (justFollowing || justFollowed || justUsers || justOrgans) {
    usersArr.forEach(user => {
      if (justFollowed) {
        if (followers[user.id]) {
          usersObj = {...usersObj, [user.id]: {...user}}
        }
      }
      if (justFollowing) {
        if (followees[user.id]) {
          usersObj = {...usersObj, [user.id]: {...user}}
        }
      }
      if (justUsers) {
        if (user.identity_type === constants.USER_TYPES.USER) {
          usersObj = {...usersObj, [user.id]: {...user}}
        }
      }
      if (justOrgans) {
        if (user.identity_type === constants.USER_TYPES.ORG) {
          usersObj = {...usersObj, [user.id]: {...user}}
        }
      }
    })
    usersArr = Object.values(usersObj)
  }

  if (usersArr.length > 0) {
    return <React.Fragment>
      {
        usersArr.map((user: Object, i: number): any =>
            <User followees={followees} key={i} data={user}/>,
        )}
    </React.Fragment>
  }
  else if (!props.loading) {
    return <div className='exchanges-explore-not-found'>کاربری یافت نشد!</div>
  }
  else return <React.Fragment>
      {loadingArr.map((user: Object, i: number) =>
          <UserSkeleton key={i}/>,
      )}
    </React.Fragment>
}

export default Users