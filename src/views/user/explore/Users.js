import React from 'react'
import User from './User'
import UserSkeleton from './User_Skeleton'
import constants from 'src/consts/constants'

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Users = (props) => {
  let {users, followees, followers, justFollowing, justFollowed, justUsers, justOrgans, identities, files, translate, currentUser} = props

  let usersArr = Object.values(users).filter(user => user.id).sort((a, b) => a.id - b.id)

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
    return usersArr.map((user, i) =>
        <User followees={followees} key={i} data={user} identities={identities} files={files} translate={translate} currentUser={currentUser}/>,
    )
  }
  else if (!props.loading) {
    return <div className='exchanges-explore-not-found'>کاربری یافت نشد!</div>
  }
  else return loadingArr.map((user, i) =>
        <UserSkeleton key={i}/>,
    )
}

export default Users