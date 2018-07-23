// @flow
import * as React from "react"
import PropTypes from "prop-types"
import "moment/locale/fa"
import type {exchangeType} from "src/consts/flowTypes/exchange/exchange"
import type {userType} from "src/consts/flowTypes/user/basicInformation"
import {DefaultExchangeIcon, DefaultUserIcon} from "src/images/icons"
import {ItemWrapper, ItemHeader} from "src/views/common/cards/Frames"
import {Link} from 'react-router-dom'
import {SocialIcon} from "src/images/icons"

type PropsExchangesWrapper = {
  children?: React.Node
}
export const ExchangesWrapper = ({children}: PropsExchangesWrapper) => {
  return (
    <ItemWrapper icon={<SocialIcon/>}>{children}</ItemWrapper>
  )
}


type PropsExchangesView = {
  exchanges: (exchangeType)[],
  exchangesImg: (?string)[],
  exchangeIdentityIds: (number)[],
  edit: boolean,
  showEdit: Function,
  removeMembership: Function,
  translate: { [string]: string }
}

export const ExchangesView = (props: PropsExchangesView) => {
  const {exchanges, exchangesImg, exchangeIdentityIds, edit, showEdit, removeMembership, translate} = props
  return (
    <ExchangesWrapper>
      <ItemHeader title={translate['Joined exchanges'] + ` (${exchanges.length})`} showEdit={showEdit}/>
      <div className="members-wrapper row mr-0 ml-0">
        {
          exchanges.map((exchange, i) => {
            return (
              <ExchangeView
                edit={edit}
                index={i}
                removeMembership={removeMembership}
                exchangeIdentityId={exchangeIdentityIds[i]}
                exchange={exchange}
                exchangeImg={exchangesImg[i]}
                userID={exchange.owner.id}
                key={i + "ExchangesView-in-social"}
              />
            )
          })
        }
      </div>
    </ExchangesWrapper>
  )
}
ExchangesView.propsTypes = {
  edit: PropTypes.bool,
  showEdit: PropTypes.func.isRequired,
  exchanges: PropTypes.arrayOf(PropTypes.object),
  exchangesImg: PropTypes.array,
  exchangeIdentityIds: PropTypes.array,
  removeMembership: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired
}


type PropsExchangeView = {
  exchange: exchangeType,
  exchangeImg: ?string,
  exchangeIdentityId: number,
  removeMembership: Function,
  index: number,
  edit: boolean
}

export const ExchangeView = (props: PropsExchangeView) => {
  const removeExchangeMembership = () => {
    const {exchangeIdentityId, removeMembership, index} = props
    removeMembership(exchangeIdentityId, index)
  }
  const {exchange, exchangeImg, edit} = props
  return (
    <div className="member-wrapper col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
      <div className="image-wrapper">
        <Link to={`/exchange/${exchange.id}`}>
          {
            (!exchangeImg) ? (<DefaultExchangeIcon/>) : (
              <img alt="" src={exchangeImg} className="rounded-circle"/>)
          }
        </Link>
      </div>
      <div className="details">
        <div className="text-section">
          <div className="name">{exchange.name}</div>
          <div className="description">{exchange.description}</div>
        </div>
        {(edit) ?
          <i className="fa fa-trash cursor-pointer mb-auto" onClick={removeExchangeMembership}/> : ('')
        }
      </div>
    </div>
  )
}

ExchangeView.propTypes = {
  exchange: PropTypes.object.isRequired,
  exchangeImg: PropTypes.string,
  exchangeIdentityId: PropTypes.number.isRequired,
  removeMembership: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  edit: PropTypes.bool,
}

type PropsFollowersWrapper = {
  children?: React.Node
}

export const FollowersWrapper = ({children}: PropsFollowersWrapper) => {
  return (
    <ItemWrapper icon={<SocialIcon/>}>{children}</ItemWrapper>
  )
}

type PropsFollowerView = {
  follower: { user: userType, img: Array<?string> }
}
export const FollowerView = (props: PropsFollowerView) => {
  const {user, img} = props.follower
  return (
    <div className="member-wrapper">
      <div className="image-wrapper">
        <Link to={`/user/${user.id}`}>
          {
            (!img) ? (<DefaultUserIcon/>) : (<img alt="" className="rounded-circle" src={img}/>)
          }
        </Link>
      </div>
      <div className="details">
        <div className="text-section">
          <div className="name">{user.name || '----'}</div>
          {/*<div className="name">{user.status || __('status')}</div>*/}
        </div>
        <Link to="#">connect</Link>
      </div>
    </div>
  )
}
FollowerView.propTypes = {
  follower: PropTypes.object.isRequired,
}

type PropsFollowersView = {
  followers: ({ user: userType, img: Array<?string> })[],
  translate: { [string]: string }
}
export const FollowersView = (props: PropsFollowersView) => {
  const {followers, translate} = props
  return (
    <FollowersWrapper>
      <ItemHeader title={translate['Followers']}/>
      <div className="members-wrapper">
        {
          followers.map((follower, i) => {
            return (
              <FollowerView follower={follower} key={i + "FollowersView"}/>
            )
          })
        }
      </div>
    </FollowersWrapper>
  )
}
FollowersView.propTypes = {
  followers: PropTypes.array.isRequired,
  translate: PropTypes.object.isRequired
}

type PropsFollowingsWrapper = {
  children?: React.Node
}
export const FollowingsWrapper = ({children}: PropsFollowingsWrapper) => {
  return (
    <ItemWrapper icon={<SocialIcon/>}>{children}</ItemWrapper>
  )
}


type PropsFollowingView = {
  edit: boolean,
  following: { user: userType, img: Array<?string> },
  index: number,
  deleteFollowing: Function,
  translate: { [string]: string }
}
export const FollowingView = (props: PropsFollowingView) => {
  const onDeleteFollowing = () => {
    const {deleteFollowing, following, index} = props
    deleteFollowing(following.follow_follower, index)
  }
  const {edit, following, translate} = props
  const {user, img} = following
  return (

    <div className="member-wrapper">
      <div className="image-wrapper">
        <Link to={`/user/${user.id}`}>
          {
            (!img) ? (<DefaultUserIcon/>) : (<img alt="" className="rounded-circle" src={img}/>)
          }
        </Link>
      </div>
      <div className="details">
        <div className="text-section">
          <div className="name">{user.name || '----'}</div>
          {/*<div className="name">{user.status || translate['status']}</div>*/}
        </div>
        {(edit) ?
          <button onClick={onDeleteFollowing}
                  className="d-block btn btn-outline-danger btn-sm mb-auto ">{translate['Delete']}
          </button> : <Link to="#">connect</Link>}
      </div>
    </div>
  )
}
FollowingView.propTypes = {
  edit: PropTypes.bool,
  following: PropTypes.object.isRequired,
  index: PropTypes.number,
  deleteFollowing: PropTypes.func,
  translate: PropTypes.object.isRequired
}


type PropsFollowingsView = {
  edit: boolean,
  showEdit: Function,
  followings: ({ user: userType, img: Array<?string> })[],
  //FixMe: mohsen followings object flow is correct?
  deleteFollowing: Function,
  translate: { [string]: string }
}
export const FollowingsView = (props: PropsFollowingsView) => {
  const {edit, showEdit, followings, deleteFollowing, translate} = props
  return (
    <FollowingsWrapper>
      <ItemHeader title={translate['Followings']} showEdit={showEdit}/>
      <div className="members-wrapper">
        {
          followings.map((following, i) => {
            return (
              <FollowingView edit={edit} index={i} deleteFollowing={deleteFollowing} following={following}
                             key={i + "FollowingsView"} translate={translate}/>
            )
          })
        }
      </div>
    </FollowingsWrapper>
  )
}
FollowingsView.propTypes = {
  edit: PropTypes.bool,
  showEdit: PropTypes.func.isRequired,
  followings: PropTypes.arrayOf(PropTypes.object.isRequired),
  deleteFollowing: PropTypes.func,
  translate: PropTypes.object.isRequired
}
