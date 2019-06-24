import React from 'react'
import {connect} from 'react-redux'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getFollowingsSelector} from 'src/redux/selectors/common/social/getNewFollowings'
import NewFollowings from './NewFollowings'
import {Component} from 'react'

class Socials extends Component {
  componentDidMount() {
    const {actions, ownerId, clientId} = this.props
    const {getFollowees} = actions
    getFollowees({followOwnerId: ownerId, followOwnerIdentity: ownerId, notProfile: true})
    getFollowees({followOwnerId: clientId, followOwnerIdentity: clientId, notProfile: true})
  }

  render() {
    const {followings, clientFollowings, ownerId} = this.props
    return <NewFollowings
        userId={ownerId}
        followings={followings}
        clientFollowings={clientFollowings}
    />
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ownerId} = ownProps
  return {
    translate: getMessages(state),
    followings: getFollowingsSelector(state, {userId: ownerId}),
    clientFollowings: getFollowingsSelector(state, {userId: state.auth.client.identity.content}),
    clientId: state.auth.client.identity.content,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: SocialActions.getFollowees,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)