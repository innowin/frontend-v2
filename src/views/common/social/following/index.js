// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import type {exchangeType} from 'src/consts/flowTypes/exchange/exchange'
import {bindActionCreators} from 'redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getFollowingsSelector} from 'src/redux/selectors/common/social/getNewFollowings'
import {getExchangeMembershipsSelector} from 'src/redux/selectors/common/social/getExchangeMemberships'
import type {paramType} from 'src/consts/flowTypes/paramType'
import NewFollowings from './NewFollowings'

type PropsSocials = {
  ownerId: number,
  identityId: number,
  actions: {
    getFollowees: Function,
    deleteFollow: Function,
    getProfileByUserId: Function,
  },
  translate: { [string]: string },
  exchanges: (exchangeType)[],
  isLoading: boolean,
  error: null | {},
  identityType: string,
  param: paramType,
}
type StateSocials = {
  editExchanges: boolean,
  editFollowings: boolean,
}

class Socials extends Component<PropsSocials, StateSocials> {
  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    identityType: PropTypes.string.isRequired,
    param: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      editFollowings: false,
    }
  }

  componentDidMount() {
    const {user, actions, ownerId, clientId} = this.props
    const {getFollowees} = actions

    if (user) {
      getFollowees({followOwnerId: ownerId, followOwnerIdentity: user.id})
      getFollowees({followOwnerId: clientId, followOwnerIdentity: clientId})
    }
  }

  render() {
    const {followings, clientFollowings, actions, ownerId} = this.props
    const {deleteFollow} = actions

    return (
        <div>
          <NewFollowings
              userId={ownerId}
              deleteFollow={deleteFollow}
              followings={followings}
              clientFollowings={clientFollowings}/>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ownerId} = ownProps
  const stateOwner = state.identities.list[ownerId]

  const defaultObject = {content: [], isLoading: false, error: null}
  const followObject = (stateOwner && stateOwner.social && stateOwner.social.follows) || defaultObject
  return {
    translate: getMessages(state),
    param: state.param,
    followings: getFollowingsSelector(state, {
      userId: ownerId,
    }),
    clientFollowings: getFollowingsSelector(state, {
      userId: state.auth.client.identity.content,
    }),
    exchanges: getExchangeMembershipsSelector(state, ownProps),
    isLoading: followObject.isLoading,
    error: followObject.error,
    clientId: state.auth.client.identity.content,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: SocialActions.getFollowees,
    deleteFollow: SocialActions.deleteFollow,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)