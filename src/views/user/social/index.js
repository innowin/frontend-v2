// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import client from 'src/consts/client'
import ExchangeActions from "src/redux/actions/exchangeActions"
import GetUserActions from '../../../redux/actions/user/getUserActions'
import OrganizationActions from "src/redux/actions/organizationActions"
import SocialActions from "../../../redux/actions/commonActions/socialActions"
import type {exchangeType} from "src/consts/flowTypes/exchange/exchange"
import {bindActionCreators} from "redux"
import {Exchanges} from "./Exchanges"
import {Followees} from './Followees'
import {Followers} from './Followers'
import {FrameCard, CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames"
import {removeExchangeMembership} from "src/crud/exchange/exchange"
import {getMessages} from "src/redux/selectors/translateSelector"
import {makeGetFolloweesSelector} from 'src/redux/selectors/common/social/getFollowees'
import {makeGetFollowersSelector} from 'src/redux/selectors/common/social/getFollowers'
import {makeGetMembershipsSelector} from 'src/redux/selectors/common/social/getMemberships'

type PropsSocials = {
  userId: number,
  identityId: number,
  actions: {
    deleteExchangeMembership: Function,
    getExchangesByMemberIdentity: Function,
    getFollowees: Function,
    getFollowers: Function,
    deleteFollow: Function,
    getProfileByUserId: Function,
    getOrganization: Function,
    updateFollow: Function,
    createFollow: Function,
  },
  translate: { [string]: string },
  followers: [],
  followees: [],
  exchanges: (exchangeType)[],
  isLoading: boolean,
  error: null | {},
  identityType: string,
}
type StateSocials = {
  editExchanges: boolean,
  editFollowings: boolean,
}

//FixMe: mohammad organization follower followees images not show correctly
class Socials extends Component<PropsSocials, StateSocials> {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    identityId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    followees: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
    exchanges: PropTypes.array.isRequired,
    identityType: PropTypes.string.isRequired,
  }
  firstStartFollower: boolean
  firstStartFollowee: boolean

  constructor(props) {
    super(props)
    this.state = {
      editExchanges: false,
      editFollowings: false,
    }

    this.firstStartFollower = true;
    this.firstStartFollowee = true
  }

  componentDidUpdate(prevProps, prevState) {
    const {followers, actions, followees} = this.props
    const {getProfileByUserId, getOrganization} = actions

    if (this.firstStartFollower && prevProps.followers !== followers && followers.length > 0 && prevProps.followers.length > 0) {
      followers.forEach(follower => {
        if (follower.identity_user) {
          getProfileByUserId(follower.identity_user)
        }
        else {
          getOrganization(follower.identity_organization)
        }
      })
      this.firstStartFollower = false
    }
    if (this.firstStartFollowee && prevProps.followees !== followees && followees.length > 0 && prevProps.followees.length > 0) {
      followees.forEach(followee => {
        if (followee.identity_user) {
          getProfileByUserId(followee.identity_user)
        }
        else {
          getOrganization(followee.identity_organization)
        }
      })
      this.firstStartFollowee = false
    }
  }

  _showExchangesEdit = () => {
    const {editExchanges} = this.state
    this.setState({...this.state, editExchanges: !editExchanges})
  }

  _showEditFollowings = () => {
    const {editFollowings} = this.state
    this.setState({...this.state, editFollowings: !editFollowings})
  }

  componentDidMount() {
    const {identityId, actions, userId, identityType} = this.props
    const {getFollowees, getFollowers, getExchangesByMemberIdentity} = actions

    if (identityId) {
      const followOwnerIdentity = identityId
      const followOwnerId = userId

      getExchangesByMemberIdentity({identityId, membershipOwnerType: identityType, membershipOwnerId: userId})
      getFollowers({followOwnerId, followOwnerIdentity, followOwnerType: identityType})
      getFollowees({followOwnerId, followOwnerIdentity, followOwnerType: identityType})
    }
  }

  render() {
    const {translate, followers, followees, actions, isLoading, error, exchanges, identityId, userId, identityType} = this.props
    const {deleteFollow, deleteExchangeMembership, updateFollow, createFollow} = actions
    const {editExchanges, editFollowings} = this.state

    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <CategoryTitle
              title={translate['Socials']}
          />
          <FrameCard className="frameCardSocial">
            {/*FIXME: mohammad fix exchange part after changed in redux by */}
            <Exchanges removeMembership={deleteExchangeMembership}
                       exchanges={exchanges}
                       showEdit={this._showExchangesEdit}
                       edit={editExchanges}
                       translate={translate}
            />
            <Followees edit={editFollowings}
                       deleteFollow={deleteFollow}
                       followees={followees}
                       showEdit={this._showEditFollowings}
                       translate={translate}
                       userId={userId}
            />
            <Followers followers={followers} translate={translate}
                       deleteFollow={deleteFollow}
                       followees={followees}
                       updateFollow={updateFollow}
                       identityId={identityId}
                       createFollow={createFollow}
                       userId={userId}
                       identityType={identityType}
            />
          </FrameCard>
        </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const getFollowersSelector = makeGetFollowersSelector(state, ownProps)
  const getFolloweesSelector = makeGetFolloweesSelector(state, ownProps)
  const getExchangesSelector = makeGetMembershipsSelector(state, ownProps)

  return (state, props) => {
    const {userId} = props
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const followObject = (stateUser && stateUser.social && stateUser.social.follow) || defaultObject

    return {
      translate: getMessages(state),
      followers: getFollowersSelector(state, props),
      followees: getFolloweesSelector(state, props),
      exchanges: getExchangesSelector(state, props),
      isLoading: followObject.isLoading,
      error: followObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangesByMemberIdentity: ExchangeActions.getExchangeIdentitiesByMemberIdentity,
    deleteExchangeMembership: ExchangeActions.deleteExchangeMembership,
    getFollowees: SocialActions.getFollowees,
    getFollowers: SocialActions.getFollowers,
    deleteFollow: SocialActions.deleteFollow,
    updateFollow: SocialActions.updateFollow,
    createFollow: SocialActions.createFollow,
    getProfileByUserId: GetUserActions.getProfileByUserId,
    getOrganization: OrganizationActions.getOrganization,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)