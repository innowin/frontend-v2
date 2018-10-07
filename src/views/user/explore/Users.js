// @flow
import * as React from 'react'
import User from './User'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'

type appProps =
    {|
      users: any
    |}

function render(users, props) {
  if (Object.values(users).length > 0) {
    return Object.values(users).map((user, i) =>
        <User key={i} data={user}/>
    )
  }
  else if (props.searchingByWord.length !== 0 || props.searchingByHashTags.length !== 0) {
    return (<div>فردی یافت نشد!</div>)
  }
  else return <ClipLoader/>
}

const Users = (props: appProps) => {
  const {users} = props
  return (
      <div className="exchanges-explore">
        {
          render(users, props)
        }
      </div>
  )
}
const mapStateToProps = (state) => ({
  searchingByWord: state.users.searchByWord,
  searchingByHashTags: state.users.searchByHashTag,
})

export default connect(mapStateToProps, null)(Users)