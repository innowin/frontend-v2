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
  let {users} = props

  users = Object.values(users)

  // if (justFollowing) {
  //   users = users.filter(user =>
  //       user.exchange
  //   )
  // }

  if (users.length > 0) {
    return users.map((user, i) =>
        <User followees={props.followees} key={i} data={user}/>
    )
  }
  else if (!props.loading) return <div className='exchanges-explore-not-found'>کاربری یافت نشد!</div>
  else return null
}

const Exchanges = (props: appProps) => {
  return render(props)
}
const mapStateToProps = (state) => ({
  searchingByWord: state.exchanges.searchByWord,
  searchingByHashTags: state.exchanges.searchByHashTag,
})

export default connect(mapStateToProps, null)(Exchanges)