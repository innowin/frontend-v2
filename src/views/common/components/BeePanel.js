import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import OrganizationBee from './OrganizationBee'
import UserBee from './UserBee'

class BeePanel extends Component {
    render() {
    if (this.props.currentUserType === 'organization')
      return <OrganizationBee/>
    else return <UserBee/>
  }
}

const mapStateToProps = (state) => {
  const id = state.auth.client.identity.content
  return ({currentUserType: state.identities.list[id] ? state.identities.list[id].identity_type : undefined})
}

export default connect(mapStateToProps)(BeePanel)