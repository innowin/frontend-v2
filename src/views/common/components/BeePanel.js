import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import OrganizationBee from './OrganizationBee'
import UserBee from './UserBee'

class BeePanel extends Component {

  render() {
    if (this.props.currentUserType === 'person')
      return <UserBee/>
    else return <OrganizationBee/>
  }
}

const mapStateToProps = (state) => {
  const client = state.auth.client
  return ({
    currentUserType: client.user_type
  })
}

export default connect(mapStateToProps)(BeePanel)