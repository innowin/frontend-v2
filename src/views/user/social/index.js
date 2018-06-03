/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {FrameCard, CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames"
import {SocialCreateForm} from "./forms"
import {SocialEditForm} from './forms'
import {ExchangesView, FollowersView, FollowingsView} from "./view"
import {getIdentityByUser} from "src/crud/identity";
import {getFollowers, getFollowings} from "src/crud/social";
import {deleteExchange, getExchangesByMemberIdentity} from "../../../crud/exchange/exchange";
import {getIdentity} from "../../../crud/identity";
import {deleteFollow} from "../../../crud/social";
import {getProfile} from "../../../crud/user/profile";
import {getFile} from "../../../crud/media/media";


class Socials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createForm: false,
      edit: false,
      exchanges: [],
      followingsList: [],
      followersImages: [],
      followersUsers: [],
      followingsImages: [],
      followingsUsers: [],
      isLoading: false,
      error: null
    }
  }

  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  _handleError = (error) => this.setState({...this.state, error: error, isLoading: false});

  _getFollowers = (followersList) => {console.log("followersList:", followersList);
    const followersUsers = this.state;
    for (let i = 0; i < followersList.length; i++) {
      getIdentity(followersList[i].follow_follower, (res) => {
        const user = res.identity_user;
        this.setState({...this.state, followersUsers: [...followersUsers, user]}, () => {
          getProfile(user.id, (res) => {
            const mediaId = res.profile_media;
            const followersImages = this.state;
            if (mediaId) {
              return getFile(mediaId, (res) =>
                this.setState({...this.state, followersImages: [...followersImages, res.file]})
              )
            } else {
              this.setState({...this.state, followersImages: [...followersImages, null]})
            }
          })
        })
      })
    }
  };

  _getFollowings = (followingsList) => {
    console.log("followersList:", followingsList);
    const followingsUsers = this.state;
    for (let i = 0; i < followingsList.length; i++) {
      getIdentity(followingsList[i].follow_followed, (res) => {
        const user = res.identity_user;
        this.setState({...this.state, followingsUsers: [...followingsUsers, user]}, () => {
          getProfile(user.id, (res) => {
            const mediaId = res.profile_media;
            const followingsImages = this.state;
            if (mediaId) {
              return getFile(mediaId, (res) =>
                this.setState({...this.state, followingsImages: [...followingsImages, res.file]})
              )
            } else {
              this.setState({...this.state, followingsImages: [...followingsImages, null], isLoading: false})
            }
          })
        })
      })
    }
  };

  _handleGet = (identityId) => {
    getExchangesByMemberIdentity(identityId, this._handleError, (results) => {
      let exchanges = [];
      if (results && results.length > 0) {
        results.map((res) => exchanges.push(res.exchange_identity_related_exchange))
      }
      this.setState({...this.state, exchanges: exchanges})
    });
    getFollowers(identityId, this._handleError, (res) => this._getFollowers(res));
    getFollowings(identityId, this._handleError, (res) =>
      this.setState({...this.state, followingsList: res}, () => this._getFollowings(res)))
  };

  componentDidMount() {
    const {userId} = this.props;
    this.setState({...this.state, isLoading: true}, () => getIdentityByUser(userId, (res) => this._handleGet(res.id)))
  }

  _deleteFollowing = (id, index) => {
    const {followingsList} = this.state;
    followingsList.splice(index, 1);
    this.setState({...this.state, followingsList: followingsList}, () => {
      deleteFollow(followingsList[index].follow_followed, this._handleError, (res) => {
          this.setState({...this.state, followingsList: res})
        }
      )
    });
  };

  _deleteExchange = (id, index) => {
    const {exchanges} = this.state;
    exchanges.splice(index, 1);
    this.setState({...this.state, exchanges: exchanges}, () => {
      deleteExchange(id, this._handleError)
    });
  };

  _mergeUsersImages = (usersArray, imagesArray) => {
    let fls = [];
    usersArray.map((user, i) => fls.push({'user': user, 'img': imagesArray[i]}));
    return fls
  };

  render() {
    const {
      createForm, exchanges, followersImages, followersUsers, followingsImages, followingsUsers, isLoading, error
    } = this.state;console.log("first section:", followersUsers, followingsUsers);
    const followers = this._mergeUsersImages(followersUsers, followersImages);
    const followings = this._mergeUsersImages(followingsUsers, followingsImages);
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Socials')}
        />
        <FrameCard className="-frameCardSocial">
          <ExchangesView deleteExchange={this._deleteExchange} exchanges={exchanges}/>
          <FollowersView followers={followers}/>
          <FollowingsView deleteFollowing={this._deleteFollowing} followings={followings}/>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Socials;