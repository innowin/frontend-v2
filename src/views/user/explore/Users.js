// @flow
import * as React from 'react'
import User from './User'
import {ClipLoader} from 'react-spinners'

type appProps =
    {|
      users: any
    |}

const Users = (props: appProps) => {
  const {users} = props
  return (
      <div className="exchanges-explore">
        {
          users ?
              Object.values(users).length > 0 ?
                  Object.values(users).map((user, i) =>
                      <User key={i} data={user}/>
                  )
                  :
                  <div>فردی یافت نشد!</div>
              :
              <ClipLoader/>
        }
      </div>
  )
}
export default Users