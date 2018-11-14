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
  // else if (props.searchingByWord.length !== 0 || props.searchingByHashTags.length !== 0) {
  //   return (<div>بورسی یافت نشد!</div>)
  // }
  else return <div style={{width: '100%', textAlign: 'center'}}><ClipLoader/></div>
}

const Exchanges = (props: appProps) => {
  return render(props)
}
const mapStateToProps = (state) => ({
  searchingByWord: state.exchanges.searchByWord,
  searchingByHashTags: state.exchanges.searchByHashTag,
})

export default connect(mapStateToProps, null)(Exchanges)