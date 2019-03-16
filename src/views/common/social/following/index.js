// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import GetUserActions from 'src/redux/actions/user/getUserActions'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import type {exchangeType} from 'src/consts/flowTypes/exchange/exchange'
import {bindActionCreators} from 'redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getFolloweesSelector} from 'src/redux/selectors/common/social/getFollowees'
// import {getFollowersSelector} from 'src/redux/selectors/common/social/getFollowers'
import {getExchangeMembershipsSelector} from 'src/redux/selectors/common/social/getExchangeMemberships'
import type {paramType} from 'src/consts/flowTypes/paramType'
import constants from 'src/consts/constants'
import NewFollowings from './NewFollowings'

type PropsSocials = {
  ownerId: number,
  identityId: number,
  actions: {
    getFollowees: Function,
    // getFollowers: Function,
    deleteFollow: Function,
    getProfileByUserId: Function,
    getOrganizationByOrganId: Function,
    // updateFollow: Function,
    // createFollow: Function,
  },
  translate: { [string]: string },
  // followers: [],
  followees: [],
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
    // translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    // isLoading: PropTypes.bool.isRequired,
    // error: PropTypes.object.isRequired,
    followees: PropTypes.array.isRequired,
    // followers: PropTypes.array.isRequired,
    // exchanges: PropTypes.array.isRequired,
    identityType: PropTypes.string.isRequired,
    param: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      // editExchanges: false,
      editFollowings: false,
    }
  }

  componentDidMount() {
    const {user, actions, ownerId} = this.props
    const {getFollowees} = actions

    if (user) {
      getFollowees({followOwnerId: ownerId, followOwnerIdentity: user.id})
    }
  }

  render() {
    const {
      // translate,
      // followers,
      followees,
      actions,
      // exchanges,
      // user,
      ownerId,
      // identityType,
      // param
    } = this.props
    const {
      deleteFollow,
      // deleteExchangeMembership,
      // updateFollow,
      // createFollow
    } = actions
    // const {
    // editExchanges,
    // editFollowings
    // } = this.state

    // const paramId = identityType === constants.USER_TYPES.USER ? +param.user : +param.organization

    return (
        <div>
          <NewFollowings
              userId={ownerId}
              deleteFollow={deleteFollow}
              followings={followees}/>
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
    // followers: getFollowersSelector(state, ownProps),
    followees: getFolloweesSelector(state, ownProps),
    exchanges: getExchangeMembershipsSelector(state, ownProps),
    isLoading: followObject.isLoading,
    error: followObject.error,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: SocialActions.getFollowees,
    // getFollowers: SocialActions.getFollowers,
    deleteFollow: SocialActions.deleteFollow,
    // updateFollow: SocialActions.updateFollow,
    // createFollow: SocialActions.createFollow,
    getProfileByUserId: GetUserActions.getProfileByUserId,
    getOrganizationByOrganId: OrganizationActions.getOrganizationByOrganId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)