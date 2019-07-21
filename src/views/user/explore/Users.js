import React from 'react'
import User from './User'
import UserSkeleton from './User_Skeleton'
import constants from 'src/consts/constants'

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Users = (props) => {
  let {users, followees, followers, justFollowing, justFollowed, justUsers, justOrgans, files, translate, currentUser, workStatus, badges} = props

  let usersArr = Object.values(users).filter(user => user.id)

  let usersObj = {}

  if (justFollowing || justFollowed || justUsers || justOrgans || (workStatus && workStatus.length > 0) || (badges && badges.length > 0)) {
    usersArr.forEach(user => {
      if (justFollowed && followers[user.id]) {
        usersObj = {...usersObj, [user.id]: {...user}}
      }
      if (justFollowing && followees[user.id]) {
        usersObj = {...usersObj, [user.id]: {...user}}
      }
      if (justUsers && user.identity_type === constants.USER_TYPES.USER) {
        usersObj = {...usersObj, [user.id]: {...user}}
      }
      if (justOrgans && user.identity_type === constants.USER_TYPES.ORG) {
        usersObj = {...usersObj, [user.id]: {...user}}
      }
      if (workStatus && user.work_status && workStatus.includes(user.work_status)) {
        usersObj = {...usersObj, [user.id]: {...user}}
      }
      // console.log(badges, user.badges)
      if (badges && user.badges && user.badges.content) {
        console.log(badges, user.badges.content)
        for (let i = 0; i < user.badges.content.length; i++) {
          if (badges.includes(user.badges.content[i])) {
            usersObj = {...usersObj, [user.id]: {...user}}
            break
          }
        }
      }
    })
    usersArr = Object.values(usersObj)
  }

  if (usersArr.length > 0) {
    return usersArr.map((user, i) =>
        <User followees={followees} key={i} data={user} files={files} translate={translate} currentUser={currentUser}/>,
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
