import React from 'react'
import {connect} from 'react-redux'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getFollowersSelector} from 'src/redux/selectors/common/social/getNewFollowers'
import {getFollowingsSelector} from 'src/redux/selectors/common/social/getNewFollowings'
import NewFollowers from './NewFollowers'
import {Component} from 'react'

class Socials extends Component {
  componentDidMount() {
    const {actions, ownerId, clientIdentityId} = this.props
    const {getFollowers, getFollowees} = actions
    getFollowees({followOwnerId: clientIdentityId, followOwnerIdentity: clientIdentityId, notProfile: true})
    getFollowers({followOwnerId: ownerId, followOwnerIdentity: ownerId, notProfile: true})
  }

  render() {
    const {clientFollowings, followers, ownerId} = this.props
    return <NewFollowers
        userId={ownerId}
        followers={followers}
        clientFollowings={clientFollowings}
    />
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ownerId} = ownProps
  return {
    translate: getMessages(state),
    followers: getFollowersSelector(state, {userId: ownerId}),
    clientFollowings: getFollowingsSelector(state, {userId: state.auth.client.identity.content}),
    clientIdentityId: state.auth.client.identity.content,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: SocialActions.getFollowees,
    getFollowers: SocialActions.getFollowers,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)