/*global __*/
import React from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import {DefaultExchangeIcon, DefaultUserIcon} from "src/images/icons";
import {SocialIcon} from "src/images/icons"
import {Link} from 'react-router-dom'
import {ItemWrapper, ItemHeader} from "src/views/common/cards/Frames";



export const ExchangesWrapper = ({children}) => {
    return (
        <ItemWrapper icon={<SocialIcon/>}>{children}</ItemWrapper>
    )
}

export const ExchangesView = (props) => {
    const {exchanges, exchangesImg, exchangeIdentityIds, edit, showEdit, removeMembership} = props;
    return (
        <ExchangesWrapper>
            <ItemHeader title={__('Joined exchanges')+` (${exchanges.length})`} showEdit={showEdit}/>
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
    removeMembership: PropTypes.func.isRequired
};

export const ExchangeView = (props) => {
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
                        (!exchangeImg)? (<DefaultExchangeIcon/>):(
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
};




export const FollowersWrapper = ({children}) => {
    return (
        <ItemWrapper icon={<SocialIcon/>}>{children}</ItemWrapper>
    )
};

export const FollowerView = (props) => {
    const {user, img} = props.follower;
    return (
        <div className="member-wrapper">
            <div className="image-wrapper">
                <Link to={`/user/${user.id}`}>
                    {
                        (!img)? (<DefaultUserIcon/>):(<img alt="" className="rounded-circle" src={img}/>)
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

export const FollowersView = (props) => {
    const {followers} = props;
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
FollowersView.propTypes = {
    followers: PropTypes.array.isRequired,
}



export const FollowingsWrapper = ({children}) => {
    return (
        <ItemWrapper icon={<SocialIcon/>}>{children}</ItemWrapper>
    )
};

export const FollowingView = (props) => {
    const onDeleteFollowing = () => {
        const {deleteFollowing, following, index} = props;
        deleteFollowing(following.follow_follower, index);
    }
    const {edit, following} = props
    const {user, img} = following
    return (

        <div className="member-wrapper">
            <div className="image-wrapper">
                <Link to={`/user/${user.id}`}>
                    {
                        (!img)? (<DefaultUserIcon/>):(<img alt="" className="rounded-circle" src={img}/>)
                    }
                </Link>
            </div>
            <div className="details">
                <div className="text-section">
                    <div className="name">{user.name || '----'}</div>
                    {/*<div className="name">{user.status || __('status')}</div>*/}
                </div>
                {(edit) ?
                    <button onClick={onDeleteFollowing} className="d-block btn btn-outline-danger btn-sm mb-auto ">{__('Delete')}
                    </button> : <Link to="#">connect</Link>}
            </div>
        </div>
    )
}
FollowingView.propTypes = {
    edit: PropTypes.bool,
    following: PropTypes.object.isRequired,
    index: PropTypes.number,
    deleteFollowing: PropTypes.func
};

export const FollowingsView = (props) => {
    const {edit, showEdit, followings, deleteFollowing} = props;
    return (
        <FollowingsWrapper>
            <ItemHeader title={__('Followings')} showEdit={showEdit}/>
            <div className="members-wrapper">
                {
                    followings.map((following, i) => {
                        return (
                            <FollowingView edit={edit} index={i} deleteFollowing={deleteFollowing} following={following}
                                           key={i + "FollowingsView"}/>
                        )
                    })
                }
            </div>
        </FollowingsWrapper>
    )
}
FollowingsView.propTypes = {
    edit:PropTypes.bool,
    showEdit:PropTypes.func.isRequired,
    followings: PropTypes.arrayOf(PropTypes.object.isRequired),
    deleteFollowing: PropTypes.func,
};
