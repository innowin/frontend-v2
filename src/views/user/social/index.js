// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import type {exchangeType} from "src/consts/flowTypes/exchange/exchange"
import {connect} from "react-redux"
import {deleteFollow} from "src/crud/social"
import {ExchangesView, FollowersView, FollowingsView} from "./view"
import {FrameCard, CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames"
import {getExchangesByMemberIdentity, removeExchangeMembership} from "src/crud/exchange/exchange"
import {getFile} from "src/crud/media/media"
import {getFollowers, getFollowings} from "src/crud/social"
import {getIdentity} from "src/crud/identity"
import {getMessages} from "src/redux/selectors/translateSelector"
import {getProfile} from "src/crud/user/profile"
import type {userType} from "src/consts/flowTypes/user/basicInformation"
import {bindActionCreators} from "redux"
import ExchangeActions from "src/redux/actions/exchangeActions"

type PropsSocials = {
  userId: number,
  identityId: number,
  actions:{
    getExchangesByMemberIdentity:Function
  },
  translate: { [string]: string }
}
type StateSocials = {
  exchanges: (exchangeType)[],
  exchangesImg: (?string)[],
  exchangeIdentityIds: (number)[],
  //FixMe : mohsen followingList flow is correct?
  followingsList: ({})[],
  followingsImg: (?string)[],
  followingsUser: (userType)[],
  followersImg: (?string)[],
  followersUser: (userType)[],
  editExchanges: boolean,
  editFollowings: boolean,
  isLoading: boolean,
  error: boolean | string
}

class Socials extends Component<PropsSocials, StateSocials> {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: [],
      exchangesImg: [],
      exchangeIdentityIds: [],
      followingsList: [],
      followingsImg: [],
      followingsUser: [],
      followersImg: [],
      followersUser: [],
      editExchanges: false,
      editFollowings: false,
      isLoading: false,
      error: false
    }
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
    identityId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
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

  _getFollowers = (followersList) => {
    let fls = []
    let images = []
    const _getIdentity = (identityId) => {
      getIdentity(identityId, (res) => {
        const user = res.identity_user
        fls.push(user)
        getProfile(user.id, (res) => {
          const mediaId = res.profile_media
          if (mediaId) {
            return getFile(mediaId, (res) => images.push(res.file))
          } else {
            images.push(null)
          }
        })
      })
    }
    for (let i = 0; i < followersList.length; i++) {
      _getIdentity(followersList[i].follow_follower)
    }
    this.setState({...this.state, followersUser: fls, followersImg: images})
  }

  _getFollowings = (followingsList) => {
    let fls = []
    let images = []
    const _getIdentity = (IdentityId) => getIdentity(IdentityId, (res) => {
      const user = res.identity_user
      fls.push(user)
      getProfile(user.id, (res) => {
        const mediaId = res.profile_media
        if (mediaId) {
          return getFile(mediaId, (res) => images.push(res.file))
        } else {
          images.push(null)
        }
      })
    })
    followingsList.forEach((following) => _getIdentity(following.follow_followed))
    this.setState({...this.state, followingsUser: fls, followingsImg: images, isLoading: false})
  }


  componentDidMount() {
    const {identityId, actions} = this.props
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
    getFollowers(identityId, this._handleError, (res) => this._getFollowers(res))
    getFollowings(identityId, this._handleError,
      (res) => this.setState({...this.state, followingsList: res}, () => this._getFollowings(res)))
  }

  _deleteFollowing = (id, index) => {
    const {followingsList} = this.state
    followingsList.splice(index, 1)
    this.setState({...this.state, followingsList: followingsList}, () => {
      deleteFollow(followingsList[index].follow_followed, this._handleError, (res) => {
          this.setState({...this.state, followingsList: res})
        }
      )
    })
  }

  _removeExchangeMembership = (id, index) => {
    const {exchanges, exchangeIdentityIds} = this.state
    exchanges.slice(0, index).concat(exchanges.slice(index + 1))
    exchangeIdentityIds.slice(0, index).concat(exchangeIdentityIds.slice(index + 1))
    removeExchangeMembership(id, this._handleError, () =>
      this.setState({...this.state, exchanges: exchanges, exchangeIdentityIds: exchangeIdentityIds}))
  }

  _mergeUsersImages = (usersArray, imagesArray) => {
    let fls = []
    usersArray.map((user, i) => fls.push({'user': user, 'img': imagesArray[i]}))
    return fls
  }

  render() {
    const {translate} = this.props
    const {
      exchanges, exchangesImg, exchangeIdentityIds, followersImg, followersUser, followingsImg, followingsUser,
      editExchanges, editFollowings, isLoading, error
    } = this.state

    const followers = this._mergeUsersImages(followersUser, followersImg)
    const followings = this._mergeUsersImages(followingsUser, followingsImg)
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
          <FollowersView followers={followers} translate={translate}/>
          <FollowingsView edit={editFollowings}
                          deleteFollowing={this._deleteFollowing}
                          followings={followings}
                          showEdit={this._showEditFollowings}
                          translate={translate}
          />
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = state => ({
  translate: getMessages(state)
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
      getExchangesByMemberIdentity: ExchangeActions.getExchangeIdentitiesByMemberIdentity,
    },
    dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Socials)