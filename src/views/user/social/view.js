/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {editIcon, defaultImg} from "src/images/icons";
import {userInfoIcon} from "src/images/icons"
import {Link} from 'react-router-dom'
import {NEW_VIEW, GET_VIEWS_COUNT} from "src/consts/Events";
import {SOCKET as socket} from "src/consts/URLS";
import {TOKEN} from "src/consts/data";
import {ItemWrapper, ItemHeader, VerifyWrapper} from "src/views/common/cards/Frames";

export const ExchangesWrapper = ({children}) => {
  return (
    <ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
  )
};

export class ExchangeItemWrapper extends Component {
  render() {
    const {showEdit} = this.props;
    return (
      <div className="-itemWrapperExchange">
        <div className="-itemEditBtn" onClick={showEdit}>{editIcon}</div>
        {this.props.children}
      </div>
    )
  }
}

export class ExchangesView extends Component {
  static propsTypes = {
    showEdit: PropTypes.func.isRequired,
    organization: PropTypes.object.isRequired,
    deleteExchange: PropTypes.func.isRequired
  };

  render() {
    const {exchanges, showEdit, deleteExchange} = this.props;
    return (
      <ExchangesWrapper>
        <ItemHeader title={__('Exchanges')} showEdit={showEdit}/>
        <div className="members-wrapper">
          {
            exchanges.map((exchange, i) => {
              return (
                <ExchangeView index={i} deleteExchange={deleteExchange} exchange={exchange} userID={exchange.owner.id}
                              key={i}/>
              )
            })
          }
        </div>
      </ExchangesWrapper>
    )
  }
}

export class ExchangeView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    exchange: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, isLoading: false, error: false};
  };

  onDeleteExchange() {
    const {exchange, deleteExchange, index} = this.props;
    deleteExchange(exchange.id, index);
  }

  render() {
    const {showEdit, exchange, user, profile, isLoading, error} = this.props;

    return (

      <div className="member-wrapper">
        <div className="image-wrapper"><Link to={`/user/${6}`}><img className="members-image" src={defaultImg}/></Link>
        </div>
        <div className="details">
          <div className="detail-wrapper">
            <div className="name">{exchange.name}</div>
            <div className="job-title">{exchange.description}</div>
          </div>
          <div className="link-wrapper">
            {(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button> : <Link to="#">connect</Link>}
            <button onClick={this.onDeleteExchange.bind(this)}
                    className="m-auto d-block btn btn-outline-danger btn-sm">{__('Delete')}</button>
          </div>
        </div>
      </div>
    )
  }
}


export const FollowersWrapper = ({children}) => {
  return (
    <ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
  )
};

export class FollowerItemWrapper extends Component {
  render() {
    const {showEdit} = this.props;
    return (
      <div className="-itemWrapperFollower">
        <div className="-itemEditBtn" onClick={showEdit}>{editIcon}</div>
        {this.props.children}
      </div>
    )
  }
}

export class FollowerView extends Component {
  static propTypes = {
    follower: PropTypes.object.isRequired,
  };

  render() {
    const {user, img} = this.props.follower;

    return (

      <div className="member-wrapper">
        <div className="image-wrapper">
          <Link to={`/user/${user.id}`}><img className="members-image" src={img || defaultImg} alt=""/></Link>
        </div>
        <div className="details">
          <div className="detail-wrapper">
            <div className="name">{user.name || '----'}</div>
            {/*<div className="name">{user.status || __('status')}</div>*/}
          </div>
          <div className="link-wrapper">{(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button> :
            <Link to="#">connect</Link>}</div>
        </div>
      </div>
    )
  }
}

export class FollowersView extends Component {
  static propTypes = {
    followers: PropTypes.array.isRequired,
  };

  render() {
    const {followers} = this.props;  console.log("final1:",followers)
    return (
      <FollowersWrapper>
        <ItemHeader title={__('Followers')}/>
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
}

export const FollowingsWrapper = ({children}) => {
  return (
    <ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
  )
};

export class FollowingItemWrapper extends Component {
  render() {
    const {showEdit} = this.props;
    return (
      <div className="-itemWrapperFollowing">
        <div className="-itemEditBtn" onClick={showEdit}>{editIcon}</div>
        {this.props.children}
      </div>
    )
  }
}

export class FollowingView extends Component {
  static propTypes = {
    following: PropTypes.object.isRequired,
    index: PropTypes.number,
    deleteFollowing: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0};
  };

  componentDidMount() {
  };

  componentWillUnmount() {
  }

  onDeleteFollowing() {
    const {deleteFollowing, following, index} = this.props;
    deleteFollowing(following.follow_follower, index);
  }

  render() {
    const {deleteFollowing, following} = this.props
    const {user, img} = following

    return (

      <div className="member-wrapper">
        <div className="image-wrapper">
          <Link to={`/user/${user.id}`}><img className="members-image" src={img || defaultImg} alt=""/></Link>
        </div>
        <div className="details">
          <div className="detail-wrapper">
            <div className="name">{user.name || '----'}</div>
          </div>
          <div className="link-wrapper">
            {(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button> : <Link to="#">connect</Link>}
            <button onClick={this.onDeleteFollowing.bind(this)}
                    className="m-auto d-block btn btn-outline-danger btn-sm">{__('Delete')}</button>
          </div>
        </div>
      </div>
    )
  }
}

export class FollowingsView extends Component {
  static propTypes = {
    followings: PropTypes.arrayOf(PropTypes.object.isRequired),
    deleteFollowing: PropTypes.func,
  };

  render() {
    const {followings, deleteFollowing} = this.props;  console.log("final2:",followings)
    return (
      <FollowingsWrapper>
        <ItemHeader title={__('Followings')}/>
        <div className="members-wrapper">
          {
            followings.map((following, i) => {
              return (
                <FollowingView index={i} deleteFollowing={deleteFollowing} following={following} key={i+ "FollowingsView"}/>
              )
            })
          }
        </div>
      </FollowingsWrapper>
    )
  }
}