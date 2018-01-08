/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {LoadingCard} from "../../common/cards/LoadingCard"
import {ProfileInfoEditForm, UserInfoEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {UserInfoItemWrapper, UserInfoView, ProfileInfoView} from "./Item"


export class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {user: null, error: null, edit: false, isLoading: false}
    }

    static propTypes = {
        userId: PropTypes.number.isRequired,
    };

    showEdit = () => {
        this.setState({edit: true});
    };

    hideEdit = () => {
        this.setState({edit: false});
    };

    componentDidMount() {
        const {userId} = this.props;
        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: url + `/users/${userId}/`,
                result: `UserInfo-get-${userId}`,
                token: "",
            },
            () => {
                const newState = {...this.state, isLoading: true};
                this.setState(newState);
            }
        );


        socket.on(`UserInfo-get-${userId}`, (res) => {
            console.log('user: ', res);
            const newState = {...this.state, user: res};
            this.setState(newState);
        });
    }

    render() {
        const {user} = this.state;
        if (this.state.edit) {
            return (
                <UserInfoItemWrapper>
                    <UserInfoEditForm
                        user={user}
                        hideEdit={this.hideEdit}
                    />
                </UserInfoItemWrapper>
            )
        }
        return (
            <UserInfoView user={user} showEdit={this.showEdit}/>
        )
    }
}

export class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {profile: null, error: null, edit: false}
    }

    static propTypes = {
        userId: PropTypes.object.isRequired,
    };

    showEdit = () => {
        this.setState({edit: true});
    };

    hideEdit = () => {
        this.setState({edit: false});
    };

    componentDidMount() {
        const {profileId} = this.props;
        const emitting = () => {
            // todo mohsen: cut set isloading and set in isloading.js and import
            const newState = {...this.state, isLoading: true};
            this.setState(newState);
            socket.emit(REST_REQUEST,
                {
                    method: "get",
                    url: url + `/users/profiles/${profileId}/`,
                    result: `ProfileInfo-get-${profileId}`,
                    token: "",
                }
            );
        };

        emitting();

        socket.on(`ProfileInfo-get-${profileId}`, (res) => {
            console.log('profile: ', res);
            const newState = {...this.state, profile: res};
            this.setState(newState);
        });
    }

    render() {
        if (!this.state.isLoading) {
            const {profile} = this.state;
            if (this.state.edit) {
                return (
                    <UserInfoItemWrapper>
                        <ProfileInfoEditForm
                            profile={profile}
                            hideEdit={this.hideEdit}
                        />
                    </UserInfoItemWrapper>
                )
            }
            return (
                <ProfileInfoView profile={profile} showEdit={this.showEdit}/>
            )
        }
        return <LoadingCard/>
    }
}


export default class UserBasicInformation extends Component {

    static propTypes = {
        userId: PropTypes.number.isRequired,
    };

    render() {
        const {userId} = this.props;
        return (
            <div>
                <CategoryTitle
                    title={__('Basic information')}
                    // showCreateForm={this.showCreateForm}
                    createForm={true}
                />
                <FrameCard>
                    <ListGroup>
                        <UserInfo {...{userId}} />
                        <ProfileInfo {...{userId}} />
                    </ListGroup>
                </FrameCard>
            </div>
        )
    }
}

