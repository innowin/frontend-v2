/*global __*/
// @flow
import * as React from "react";
import "moment/locale/fa";
import {EditIcon, DefaultUserIcon, DefaultExchangeIcon} from "src/images/icons";
import {userInfoIcon} from "src/images/icons"
import {Link} from 'react-router-dom'
import {ItemWrapper, ItemHeader, VerifyWrapper} from "src/views/common/cards/Frames";


type ExchangesWrapperProps = {
    children?: React.Node,
};
export function ExchangesWrapper (props:ExchangesWrapperProps) {
    return (
        <ItemWrapper icon={userInfoIcon}>{props.children}</ItemWrapper>
    )
};

type ExchangeItemWrapperProps = {
    showEdit: boolean,
    children?: React.Node,
};
export class ExchangeItemWrapper extends React.Component<ExchangeItemWrapperProps> {
    render() {
        const {showEdit} = this.props;
        return (
            <div className="-itemWrapperExchange">
                <div className="-itemEditBtn" onClick={showEdit}><EditIcon /></div>
                {this.props.children}
            </div>
        )
    }
}

type ExchangesViewProps = {
    showEdit?: boolean,
    exchanges: Array<Object>,
    deleteExchange: Function
};
export class ExchangesView extends React.Component<ExchangesViewProps> {
  static defaultProps = {
    exchanges:[]
  }
	render() {
		const {exchanges, showEdit, deleteExchange} = this.props;
		// console.log('organization member is : ', members);
		return (
				<ExchangesWrapper>
					<ItemHeader title={__('Exchanges')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
							exchanges.map((exchange, i)=>{
								return (
                  <ExchangeView index={i} deleteExchange={deleteExchange} exchange={exchange} userID={exchange.exchange_identity_related_identity.id} key={i}/>
								)
							})
						}
					</div>
				</ExchangesWrapper>
		)
	}
}

type ExchangeViewProps = {
    exchange: Object,
    deleteExchange:Function,
    index:number,
}
type ExchangeViewState = {
    viewerCount: number,
    isLoading: boolean,
    error: boolean
};

export class ExchangeView extends React.Component<ExchangeViewProps, ExchangeViewState> {
    state = {
        viewerCount: 0,
        isLoading: false,
        error: false
    };
    constructor(props: ExchangeViewProps) {
        super(props)
    };

    componentDidMount() {
    };

    componentWillUnmount() {
    }
    onDeleteExchange(){
        const{exchange, deleteExchange, index} = this.props;
        deleteExchange(exchange.id,index);
    }
    render() {
        const {exchange} = this.props;

        return (

            <div className="member-wrapper">
                <div className="image-wrapper">
                    <Link to={`/user/${6}`}>
                        <DefaultExchangeIcon/>
                    </Link>
                </div>
                <div className="details">
                    <div>
                        <div className="name">{exchange.name}</div>
                        <div className="job-title">{exchange.description}</div>
                    </div>
                    {(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button>:""}
                    <button onClick={this.onDeleteExchange.bind(this)} className="m-auto d-block btn btn-outline-danger btn-sm">{__('Delete')}</button>
                </div>
            </div>
        )
    }
}
type FollowersWrapperProps ={
    children: React.Node
}
export  function FollowersWrapper(props:FollowersWrapperProps){
    return (
        <ItemWrapper icon={userInfoIcon}>{props.children}</ItemWrapper>
    )
};
type FollowerItemWrapperProps ={
    showEdit: boolean,
    children: React.Node
}
export class FollowerItemWrapper extends React.Component<FollowerItemWrapperProps> {
    render() {
        const {showEdit} = this.props;
        return (
            <div className="-itemWrapperFollower">
                <div className="-itemEditBtn" onClick={showEdit}><EditIcon/></div>
                {this.props.children}
            </div>
        )
    }
}

type FollowersViewProps ={
    showEdit?: Function,
    followers: Array<Object>
}
export class FollowersView extends React.Component<FollowersViewProps> {
  static defaultProps = {
    followers : []
  }
	render() {
		const {followers, showEdit} = this.props;
		// console.log('organization member is : ', members);
		return (
				<FollowersWrapper>
					<ItemHeader title={__('Followers')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
							followers.map((follower, i)=>{
								return (
                    <FollowerView follower={follower} userID={follower.id || 6} key={i}/>
								)
							})
						}
					</div>
				</FollowersWrapper>
		)
	}
}
type FollowerViewProps = {
    follower: Object
}
export class FollowerView extends React.Component<FollowerViewProps,{viewerCount:number}> {

    state = {viewerCount: 0};

    constructor(props:FollowerViewProps) {
        super(props);
    };

    componentDidMount() {
    };

    componentWillUnmount() {
    }

    render() {
        const {follower} = this.props;

        return (

            <div className="member-wrapper">
                <div className="image-wrapper">
                    <Link to={`/user/${6}`}>
                        <DefaultUserIcon/>
                    </Link>
                </div>
                <div className="details">
                    <div>
                        <div className="name">{follower.name}</div>
                        <div className="job-title">{follower.description}</div>
                    </div>
                    {(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button>:<Link to="#">connect</Link>}
                </div>
            </div>
        )
    }
}


type FollowingsWrapperProps = {
    children: React.Node
}
export const FollowingsWrapper = (props:FollowingsWrapperProps) => {
    return (
        <ItemWrapper icon={userInfoIcon}>{props.children}</ItemWrapper>
    )
};
type FollowingItemWrapperProps = {
    showEdit : boolean,
    children: React.Node
}
export class FollowingItemWrapper extends React.Component<FollowingItemWrapperProps> {
    render() {
        const {showEdit} = this.props;
        return (
            <div className="-itemWrapperFollowing">
                <div className="-itemEditBtn" onClick={showEdit}><EditIcon/></div>
                {this.props.children}
            </div>
        )
    }
}
type FollowingsViewProps = {
    showEdit? : boolean,
    deleteFollowing : Function,
    followings : Array<Object>
}
export class FollowingsView extends React.Component<FollowingsViewProps> {
  static defaultProps = {
    followings : []
  }
	render() {
		const {followings, showEdit, deleteFollowing} = this.props;
    // console.log('organization member is : ', members);
		return (
				<FollowingsWrapper>
					<ItemHeader title={__('Followings')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
              followings.map((following, i)=>{
								return (
                    <FollowingView index={i} deleteFollowing={deleteFollowing} following={following} userID={following.id || 6} key={i}/>
								)
              })
            }
					</div>
				</FollowingsWrapper>
		)
	}
}
type FollowingViewProps = {
    deleteFollowing:Function,
    following: Object,
    index: number
}
export class FollowingView extends React.Component<FollowingViewProps, {viewerCount: number, isLoading: boolean, error: boolean}> {

    state = {viewerCount: 0, isLoading: false, error: false};
    constructor(props:FollowingViewProps) {
        super(props);
    };

    onDeleteFollowing(){
        const {deleteFollowing, following, index} = this.props;
        deleteFollowing(following.follow_follower, index);
    }
    render() {
        const {following } = this.props;

        return (

            <div className="member-wrapper">

                <div className="image-wrapper">
                    <Link to={`/user/${6}`}>
                        <DefaultUserIcon/>
                    </Link>
                </div>
                <div className="details">
                    <div>
                        <div className="name">{following.name}</div>
                        <div className="job-title">{following.description}</div>
                    </div>
                    {(false) ? <button className="btn btn-outline-danger">{__('Delete')}</button>:<Link to="#">connect</Link>}
                    <button onClick={this.onDeleteFollowing.bind(this)} className="m-auto d-block btn btn-outline-danger btn-sm">{__('Delete')}</button>
                </div>
            </div>
        )
    }
}
