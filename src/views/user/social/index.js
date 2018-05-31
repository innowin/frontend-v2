/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {FrameCard, CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames"
import {SocialCreateForm} from "./forms"
import {SocialEditForm} from './forms'
import {ExchangesView, FollowersView, FollowingsView} from "./view"
import {getIdentityByUser} from "src/crud/identity";
import {getFollowed, getFollower} from "src/crud/social";
import {deleteExchange, getExchangesByMemberIdentity} from "../../../crud/exchange/exchange";
import {getIdentity} from "../../../crud/identity";
import {deleteFollow} from "../../../crud/social";


class Socials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createForm: false,
      edit: false,
      exchanges: [],
      followersList: [],
      followingsList: [],
      followers: [],
      followings: [],
      isLoading: false,
      error: null
    }
  }

  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  _handleError = (error) => this.setState({...this.state, error: error, isLoading: false})

  getFollowers() {
    let {followersList} = this.state;
    let fls = [];
    for (let i = 0; i < followersList.length; i++) {
      getIdentity(followersList[i].follow_follower, (res) => {
        fls.push(res.identity_user);
      })
    }
    this.setState({...this.state, followers: fls})
  }

  getFollowings() {
    let {followingsList} = this.state;
    let fls = [];
    for (let i = 0; i < followingsList.length; i++) {
      getIdentity(followingsList[i].follow_followed, (res) => {
        fls.push(res.identity_user);
      })
    }
    this.setState({...this.state, followings: fls, isLoading: false})
  }

  _handleGet = (identityId) => {
    getExchangesByMemberIdentity(identityId, this._handleError, (results) => {
      let exchanges = []
      if(results && results.length > 0){
        results.map((res) => exchanges.push(res.exchange_identity_related_exchange))
      }
      this.setState({...this.state, exchanges: exchanges})
    })
    getFollower(identityId, this._handleError, (res) =>
      this.setState({...this.state, followersList: res}, () => this.getFollowers()))
    getFollowed(identityId, this._handleError, (res) =>
      this.setState({...this.state, followingsList: res}, () => this.getFollowings()))
  }

  componentDidMount() {
    const {userId} = this.props;
    this.setState({...this.state, isLoading: true}, () => getIdentityByUser(userId, (res) => this._handleGet(res.id)))
  }

  deleteFollowing = (id, index) => {
    const {followings, followingsList} = this.state;
    followings.splice(index, 1);
    this.setState({...this.state, followings: followings}, () => {
      deleteFollow(followingsList[index].follow_followed, this._handleError, (res) => {
          this.setState({...this.state, followings: res})
        }
      )
    });
  }

  deleteExchange = (id, index) => {
    const {exchanges} = this.state;
    exchanges.splice(index, 1);
    this.setState({...this.state, exchanges: exchanges}, () => {
      deleteExchange(id, this._handleError)
    });
  }

  render() {
    const {createForm, users, exchanges, followings, followers, isLoading, error} = this.state;

    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Socials')}
        />
        <FrameCard className="-frameCardSocial">
          <ExchangesView deleteExchange={this.deleteExchange} exchanges={exchanges}/>
          <FollowersView followers={followers}/>
          <FollowingsView deleteFollowing={this.deleteFollowing} followings={followings}/>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Socials;