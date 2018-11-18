// @flow
import * as React from 'react'
import User from './User'
import UserSkeleton from './User_Skeleton'

type appProps =
    {|
      users: any
    |}

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function render(props) {
  let {users, followees, followers, justFollowing, justFollowed} = props

  users = Object.values(users)

  if (justFollowing && justFollowed) {
    users = users.filter(user =>
        followees[user.user.id] || followers[user.user.id]
    )
  }
  else if (justFollowing) {
    users = users.filter(user =>
        followees[user.user.id]
    )
  }
  else if (justFollowed) {
    users = users.filter(user =>
        followers[user.user.id]
    )
  }

  if (users.length > 0) {
    return users.map((user, i) =>
        <User followees={followees} key={i} data={user}/>
    )
  }
  else if (!props.loading) {
    return <div className='exchanges-explore-not-found'>کاربری یافت نشد!</div>
  }
  else return loadingArr.map((user, i) =>
        <UserSkeleton key={i}/>
    )
}

const Users = (props: appProps) => {
  return render(props)
}

export default Users