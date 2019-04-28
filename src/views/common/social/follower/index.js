// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import GetUserActions from "src/redux/actions/user/getUserActions"
import SocialActions from "src/redux/actions/commonActions/socialActions"
import type {exchangeType} from "src/consts/flowTypes/exchange/exchange"
import {bindActionCreators} from "redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {getFollowersSelector} from "src/redux/selectors/common/social/getNewFollowers"
import {getFollowingsSelector} from "src/redux/selectors/common/social/getNewFollowings"
import {getExchangeMembershipsSelector} from "src/redux/selectors/common/social/getExchangeMemberships"
import type {paramType} from "src/consts/flowTypes/paramType"
import constants from "src/consts/constants"
import NewFollowers from "./NewFollowers"

type PropsSocials = {
  ownerId: number,
  identityId: number,
  actions: {
    // getFollowees: Function,
    getFollowers: Function,
    deleteFollow: Function,
    getProfileByUserId: Function,
    updateFollow: Function,
    // createFollow: Function,
  },
  translate: { [string]: string },
  followers: [],
  // followees: [],
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
    // followees: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
    // exchanges: PropTypes.array.isRequired,
    identityType: PropTypes.string.isRequired,
    param: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      // editExchanges: false,
      editFollowings: false
    }
  }

  componentDidMount() {
    const {actions, ownerId} = this.props
    const {getFollowers, getFollowees} = actions

    getFollowees({followOwnerId: ownerId, followOwnerIdentity: ownerId})
    getFollowers({followOwnerId: ownerId, followOwnerIdentity: ownerId})

    console.log(this.props.followers)
  }

  render() {
    const {
      // translate,
      followers,
      // followees,
      actions,
      // exchanges,
      // identityId,
      ownerId,
      identityType,
      param,
      followings
    } = this.props
    const {
      deleteFollow,
      // deleteExchangeMembership,
      updateFollow
      // createFollow
    } = actions
    // const {
    //   editExchanges,
    // editFollowings
    // } = this.state

    const paramId = identityType === constants.USER_TYPES.USER ? +param.user : +param.organization

    // console.log("followersfollowersfollowers", followers)

    return (
        <div>
          <NewFollowers
              userId={ownerId}
              followers={followers}
              followings={followings}
              identityType={identityType}
              updateFollow={updateFollow}
              deleteFollow={deleteFollow}
              paramId={paramId}/>
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
    followers: getFollowersSelector(state, {
      userId: ownerId
    }),
    followings: getFollowingsSelector(state, {
      userId: ownerId
    }),
    exchanges: getExchangeMembershipsSelector(state, ownProps),
    isLoading: followObject.isLoading,
    error: followObject.error,
    clientType: state.auth.client.user_type,
    clientIdentityId: state.auth.client.identity.content
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: SocialActions.getFollowees,
    getFollowers: SocialActions.getFollowers,
    deleteFollow: SocialActions.deleteFollow,
    updateFollow: SocialActions.updateFollow,
    // createFollow: SocialActions.createFollow,
    getProfileByUserId: GetUserActions.getProfileByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)