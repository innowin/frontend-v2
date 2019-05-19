import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import OrganizationBee from './OrganizationBee'
import UserBee from './UserBee'

class BeePanel extends Component {
  render() {
    const {isBeeDone, currentUserType} = this.props
    if (isBeeDone) return null
    else {
      if (currentUserType === 'organization')
        return <OrganizationBee/>
      else return <UserBee/>
    }
  }
}

const mapStateToProps = (state) => {
  const id = state.auth.client.identity.content
  return ({
    currentUserType: state.identities.list[id] ? state.identities.list[id].identity_type : undefined,
    isBeeDone: state.auth.client.isBeeDone,
  })
}

export default connect(mapStateToProps)(BeePanel)