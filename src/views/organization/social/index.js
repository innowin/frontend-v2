/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
// import {createSocial, deleteSocial, updateSocial} from 'src/crud/user/Socials'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {SocialCreateForm} from "./forms"
import {SocialEditForm} from './forms'
import {ExchangeItemWrapper, ExchangesView, FollowersView, FollowingsView} from "./view"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import { IDENTITY_ID, ID } from "../../../consts/data";
//TODO CRUD
class Socials extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null,followersList:[], followingsList:[], followers:[], followings:[], exchanges:[], followers: [], user: {}};
  }

  static propTypes = {
    organizationId: PropTypes.string.isRequired
  };

  componentDidMount() {
    console.log(TOKEN);
    const {organizationId, userId} = this.props;
    const self = this;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);

      //Socials exchanges  get //TODO itsnow owned but joined exchanges
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/exchanges/?owner=${organizationId}`,
          result: `userExchnages-Socials-get/${organizationId}`,
          token: TOKEN
        }
      );

      socket.emit(REST_REQUEST,
      {
        method:"get",
        url: `${url}/users/identities/?identity_organization=${organizationId}`,
        result :`organization-identity-id-get/${organizationId}`,
        token:TOKEN
      })

      
    };

    emitting();
    socket.on(`organization-identity-id-get/${organizationId}`,(res)=>{
      if(res.detail){

      }else{
        //followers get with follow_identity
        socket.emit(REST_REQUEST,
          {
            method: "get",
            url: `${url}/organizations/follows/?follow_followed=${res[0].id}`,
            result: `organizationFollowers-Socials-get/${organizationId}`,
            token: TOKEN
          }
        );
        //get followers follow_follower
        socket.emit(REST_REQUEST,
          {
            method: "get",
            url: `${url}/organizations/follows/?follow_follower=${res[0].id}`,
            result: `organizationFollowings-Socials-get/${organizationId}`,
            token: TOKEN
          }
        );
      }
    })
    
    socket.on(`userExchnages-Socials-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, exchanges: res, isLoading: false};
        this.setState(newState);
      }
    })

    socket.on(`organizationFollowers-Socials-get/${organizationId}`, (res) => {
      console.log(IDENTITY_ID);
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, followersList: res, followers:[], isLoading: false};
        this.setState(newState, ()=>{
          this.getFollowers();
        });
      }
    })

    socket.on(`organizationFollowings-Socials-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, followings:[], followingsList: res, isLoading: false};
        this.setState(newState, ()=>{
          this.getFollowings();
        });
      }
    })

    socket.on(`organizationFollowings-following-get`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        let fls = this.state.followings;
        fls.push(res);
        const newState = {...this.state, followings: fls, isLoading: false};
        this.setState(newState);
      }
    })

    socket.on(`organizationFollowers-follower-get`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        let fls = this.state.followers;
        fls.push(res);
        const newState = {...this.state, followers: fls, isLoading: false};
        this.setState(newState);
      }
    })

    socket.on(`organizationFollowing-delete`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        // const newState = {...this.state, followings: res, isLoading: false};
        // this.setState(newState);
      }
    })

  }

  componentWillUnmount() {
    const {organizationId} = this.props;

    socket.off(`userExchnages-Socials-get/${organizationId}`);
    socket.off(`user-Socials-get/${organizationId}`);
    socket.off(`userFollowers-Socials-get/${organizationId}`);
    socket.off(`userFollowings-Socials-get/${organizationId}`);
    socket.off(`organizationFollowings-following-get`);

  }

  getFollowers(){//TODO backed changed follow_identity doesn't exist
    let {followersList} = this.state;
    for(var i = 0 ; i < followersList.length; i++){
      socket.emit(REST_REQUEST,{
        method: "get",
        url: `${url}/users/identities/${followersList[i].follow_follower}/`,
        result: `organizationFollowers-follower-get`,
        token: TOKEN
      })

    }
  }

  getFollowings(){
    let {followingsList} = this.state;
    for(var i = 0 ; i < followingsList.length; i++){
      socket.emit(REST_REQUEST,{
        method: "get",
        url: `${url}/users/identities/${followingsList[i].follow_followed}/`,
        result: `organizationFollowings-following-get`,
        token: TOKEN
      })

    }
  }

  deleteFollowing(id, index){
    const {followings, followingsList} = this.state;
    followings.splice(index,1);
    this.setState({...this.state, followings:followings}, ()=>{
      socket.emit(REST_REQUEST,{
        method: "del",
        url: `${url}/organizations/follows/?follow_followed=${followingsList[index].follow_followed}`,
        result: `organizationFollowing-delete`,
        token: TOKEN
      })
    });    
  }
  deleteExchange(id, index){ //TODO
    const {exchanges} = this.state;
    exchanges.splice(index,1);
    this.setState({...this.state, exchanges:exchanges}, ()=>{
      
    });   
  }

  render() {
    const {
      createForm,
      exchanges,
      user,
      profile,
      isLoading,
      error,
      followings,
      followers} = this.state;
    
    return (
      <VerifyWrapper isLoading={false} error={false}>
        <CategoryTitle
          title={__('Socials')}
        />
        <FrameCard className="-frameCardSocial">
          <ExchangesView deleteExchange ={this.deleteExchange.bind(this)} exchanges = {exchanges} user={user}/>
          <FollowersView followers = {followers} user={user}/>
          <FollowingsView deleteFollowing = {this.deleteFollowing.bind(this)} followings = {followings} user={user}/>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Socials;