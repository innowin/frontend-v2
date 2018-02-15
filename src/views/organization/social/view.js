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
	};
	render() {
		const {exchanges, showEdit} = this.props;
		// console.log('organization member is : ', members);
		return (
				<ExchangesWrapper>
					<ItemHeader title={__('Exchanges')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
							exchanges.map((exchange)=>{
								return (
                  exchanges.map((exchange, i) => (
                    <ExchangeView exchange={exchange} userID={exchange.owner.id} key={i}/>
                  ))
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

  componentDidMount() {
  };

  componentWillUnmount() {
  }

  render() {
		const {showEdit, exchange, user, profile, isLoading, error} = this.props;

    return (

        <div className="member-wrapper">
          <div className="image-wrapper"><Link to={`/user/${6}`}><img className="members-image" src={defaultImg} /></Link></div>
          <div className="details">
              <div className="detail-wrapper">
                <div className="name">{exchange.name}</div>
                <div className="job-title">{exchange.description}</div>
              </div>
            <div className="link-wrapper">{(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button>:<Link to="#">connect</Link>}</div>
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
export class FollowersView extends Component {
	static propsTypes = {
		showEdit: PropTypes.func.isRequired,
		organization: PropTypes.object.isRequired,
	};
	render() {
		const {followers, showEdit} = this.props;
		// console.log('organization member is : ', members);
		return (
				<FollowersWrapper>
					<ItemHeader title={__('Followers')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
							followers.map((follower)=>{
								return (
                  followers.map((follower, i) => (
                    <FollowerView follower={follower} userID={follower.id || 6} key={i}/>
                  ))
								)
							})
						}
					</div>
				</FollowersWrapper>
		)
	}
}

export class FollowerView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    follower: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, isLoading: false, error: false};
  };

  componentDidMount() {
  };

  componentWillUnmount() {
  }

  render() {
		const {showEdit, follower, user, profile, isLoading, error} = this.props;

    return (

        <div className="member-wrapper">
          <div className="image-wrapper"><Link to={`/user/${6}`}><img className="members-image" src={defaultImg} /></Link></div>
          <div className="details">
              <div className="detail-wrapper">
                <div className="name">{follower.name}</div>
                <div className="job-title">{follower.description}</div>
              </div>
            <div className="link-wrapper">{(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button>:<Link to="#">connect</Link>}</div>
          </div>
        </div>
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
export class FollowingsView extends Component {
	static propsTypes = {
		showEdit: PropTypes.func.isRequired,
		organization: PropTypes.object.isRequired,
	};
	render() {
		const {followings, showEdit} = this.props;
		// console.log('organization member is : ', members);
		return (
				<FollowingsWrapper>
					<ItemHeader title={__('Followings')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
							followings.map((following)=>{
								return (
                  followings.map((following, i) => (
                    <FollowingView following={following} userID={following.id || 6} key={i}/>
                  ))
								)
							})
						}
					</div>
				</FollowingsWrapper>
		)
	}
}

export class FollowingView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    following: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, isLoading: false, error: false};
  };

  componentDidMount() {
  };

  componentWillUnmount() {
  }

  render() {
		const {showEdit, following, user, profile, isLoading, error} = this.props;

    return (

        <div className="member-wrapper">
          <div className="image-wrapper"><Link to={`/user/${6}`}><img className="members-image" src={defaultImg} /></Link></div>
          <div className="details">
              <div className="detail-wrapper">
                <div className="name">{following.name}</div>
                <div className="job-title">{following.description}</div>
              </div>
            <div className="link-wrapper">{(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button>:<Link to="#">connect</Link>}</div>
          </div>
        </div>
    )
  }
}