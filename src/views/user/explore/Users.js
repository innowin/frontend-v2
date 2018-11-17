// @flow
import * as React from 'react'
import User from './User'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'

type appProps =
    {|
      users: any
    |}

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
  else if (!props.loading) return <div className='exchanges-explore-not-found'>کاربری یافت نشد!</div>
  else return null
}

const Users = (props: appProps) => {
  return render(props)
}

export default Users