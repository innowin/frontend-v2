// @flow
import * as React from 'react'
import User from './User'
import UserSkeleton from './User_Skeleton'

type appProps =
    {|
      users: Array<any>,
      followees: Object,
      followers: Object,
      justFollowing: boolean,
      justFollowed: boolean,
      loading: boolean
    |}

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Users = (props: appProps) => {
  let {users, followees, followers, justFollowing, justFollowed} = props

  users = Object.values(users)

  if (justFollowing && justFollowed) {
    users = users.filter((user: Object) =>
        followees[user.user.id] || followers[user.user.id]
    )
  }
  else if (justFollowing) {
    users = users.filter((user: Object) =>
        followees[user.user.id]
    )
  }
  else if (justFollowed) {
    users = users.filter((user: Object) =>
        followers[user.user.id]
    )
  }

  if (users.length > 0) {
    return <React.Fragment>
      {
        users.map((user: Object, i: number): any =>
            <User followees={followees} key={i} data={user}/>
        )}
    </React.Fragment>
  }
  else if (!props.loading) {
    return <div className='exchanges-explore-not-found'>کاربری یافت نشد!</div>
  }
  else return <React.Fragment>
      {loadingArr.map((user: Object, i: number) =>
          <UserSkeleton key={i}/>
      )}
    </React.Fragment>
}

export default Users