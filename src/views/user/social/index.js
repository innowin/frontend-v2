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
import {deleteFollow} from "src/crud/social"
import {ExchangesView} from "./view"
import {Followees} from './Followees'
import {Followers} from './Followers'
import {FrameCard, CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames"
import {getExchangesByMemberIdentity, removeExchangeMembership} from "src/crud/exchange/exchange"
import {getMessages} from "src/redux/selectors/translateSelector"
import {makeGetFolloweesSelector} from 'src/redux/selectors/common/social/getFollowees'
import {makeGetFollowersSelector} from 'src/redux/selectors/common/social/getFollowers'

type PropsSocials = {
  userId: number,
  identityId: number,
  actions: {
    getExchangesByMemberIdentity: Function,
    getFollowees: Function,
    getFollowers: Function,
    deleteFollow: Function,
    getProfileByUserId: Function,
    getOrganization: Function,
  },
  translate: { [string]: string },
  followers: [],
  followees: [],
}
type StateSocials = {
  exchanges: (exchangeType)[],
  exchangesImg: (?string)[],
  exchangeIdentityIds: (number)[],
  editExchanges: boolean,
  editFollowings: boolean,
  isLoading: boolean,
  error: boolean | string,
}

//FixMe: mohammad organization follower followees images not show correctly
class Socials extends Component<PropsSocials, StateSocials> {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    identityId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      exchanges: [],
      exchangesImg: [],
      exchangeIdentityIds: [],
      editExchanges: false,
      editFollowings: false,
      isLoading: false,
      error: false,
    }

    this.firstStartFollower= true;
    this.firstStartFollowee = true
  }

  componentDidUpdate(prevProps, prevState) {
    const {followers, actions, followees} = this.props
    const {getProfileByUserId, getOrganization} = actions

    // const {firstStartFollower, firstStartFollowee} = this.state

    if (this.firstStartFollower && prevProps.followers !== followers && followers && prevProps.followers) {
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
    if (this.firstStartFollowee && prevProps.followees !== followees && followees && prevProps.followees) {
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

  _handleError = (error: boolean | string) => this.setState({...this.state, error: error, isLoading: false})

  componentDidMount() {
    const {identityId, actions, userId} = this.props
    const {getFollowees, getFollowers} = actions

    if (identityId) {
      // const {getExchangesByMemberIdentity} = actions
      // getExchangesByMemberIdentity(identityId)

      getExchangesByMemberIdentity(identityId, this._handleError, (results) => {
        if (results && results.length > 0) {
          let exchanges = []
          let exchangesImg = []
          let exchangeIdentityIds = []
          results.forEach((res) => {
            exchanges.push(res.exchange_identity_related_exchange)
            exchangeIdentityIds.push(res.id)
            if (res.exchange_identity_related_exchange.exchange_image) {
              exchangesImg.push(res.exchange_identity_related_exchange.exchange_image.file)
            } else {
              exchangesImg.push(null)
            }
          })
          this.setState({
            ...this.state, exchanges: exchanges, exchangeIdentityIds: exchangeIdentityIds,
            exchangesImg: exchangesImg
          })
        }
      })

      const followOwnerIdentity = identityId
      const followOwnerId = userId
      const followOwnerType = client.getUserType()
      getFollowers({followOwnerId, followOwnerIdentity, followOwnerType})
      getFollowees({followOwnerId, followOwnerIdentity, followOwnerType})
    }
  }
  _removeExchangeMembership = (id, index) => {
    const {exchanges, exchangeIdentityIds} = this.state
    exchanges.slice(0, index).concat(exchanges.slice(index + 1))
    exchangeIdentityIds.slice(0, index).concat(exchangeIdentityIds.slice(index + 1))
    removeExchangeMembership(id, this._handleError, () =>
        this.setState({...this.state, exchanges: exchanges, exchangeIdentityIds: exchangeIdentityIds}))
  }

  render() {
    const {translate, followers, followees, actions} = this.props
    const {deleteFollow} = actions
    const {
      exchanges, exchangesImg, exchangeIdentityIds, editExchanges, editFollowings, isLoading, error
    } = this.state

    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <CategoryTitle
              title={translate['Socials']}
          />
          <FrameCard className="frameCardSocial">
            <ExchangesView removeMembership={this._removeExchangeMembership}
                           exchanges={exchanges}
                           exchangesImg={exchangesImg}
                           exchangeIdentityIds={exchangeIdentityIds}
                           showEdit={this._showExchangesEdit}
                           edit={editExchanges}
                           translate={translate}
            />
            <Followees edit={editFollowings}
                       deleteFollow={deleteFollow}
                       followees={followees}
                       showEdit={this._showEditFollowings}
                       translate={translate}
            />
            <Followers followers={followers} translate={translate}
                       deleteFollow={deleteFollow}
            />
          </FrameCard>
        </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const getFollowersSelector = makeGetFollowersSelector(state, ownProps)
  const getFolloweesSelector = makeGetFolloweesSelector(state, ownProps)

  return (state, props) => {

    const {userId} = props
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const followObject = (stateUser && stateUser.social && stateUser.social.follow) || defaultObject

    return {
      translate: getMessages(state),
      followers: getFollowersSelector(state, props),
      followees: getFolloweesSelector(state, props),
      isLoading: followObject.isLoading,
      error: followObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
        getExchangesByMemberIdentity: ExchangeActions.getExchangeIdentitiesByMemberIdentity,
        getFollowees: SocialActions.getFollowees,
        getFollowers: SocialActions.getFollowers,
        deleteFollow: SocialActions.deleteFollow,
        getProfileByUserId: GetUserActions.getProfileByUserId,
        getOrganization: OrganizationActions.getOrganization,
      },
      dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)