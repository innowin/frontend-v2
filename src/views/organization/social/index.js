/*global __*/
// @flow
import * as React from "react";
import PropTypes from 'prop-types'
import {FrameCard, CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames"
import {SocialCreateForm} from "./forms"
import {SocialEditForm} from './forms'
import {ExchangesView, FollowersView, FollowingsView} from "./view"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import { IDENTITY_ID} from "../../../consts/data";
import OrganizationActions from '../../../redux/actions/organizationActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
//TODO CRUD
type SocialsProps ={
  organizationId: string,
  organization:Object,
  actions:Object,
  isLoading:boolean,
}
class Socials extends React.Component<SocialsProps,{
  createForm: boolean,
  edit: boolean,
}> {
  state = {
    createForm: false,
    edit: false,
  };
  constructor(props:SocialsProps ) {
    super(props);

  }

  static propTypes = {
    organizationId: PropTypes.string.isRequired
  };

  componentDidMount() {
    console.log(TOKEN);
    const {organizationId} = this.props;
    const {getFollowers, getFollowings, getExchanges} = this.props.actions;
    getFollowers(organizationId);
    getFollowings(organizationId);
    getExchanges(organizationId);

  }

  componentWillUnmount() {
    const {organizationId} = this.props;
  }

  getFollowers(){//TODO backed changed follow_identity doesn't exist
    // let {organization,followings,followers} = this.props.organization;
    // for(var i = 0 ; i < followersList.length; i++){
    //   socket.emit(REST_REQUEST,{
    //     method: "get",
    //     url: `${url}/users/identities/${followersList[i].follow_follower}/`,
    //     result: `organizationFollowers-follower-get`,
    //     token: TOKEN
    //   })

    // }
  }

  getFollowings(){
    // let {followingsList} = this.state;
    // for(var i = 0 ; i < followingsList.length; i++){
    //   socket.emit(REST_REQUEST,{
    //     method: "get",
    //     url: `${url}/users/identities/${followingsList[i].follow_followed}/`,
    //     result: `organizationFollowings-following-get`,
    //     token: TOKEN
    //   })

    // }
  }

  deleteFollowing(id:number, index:number){
    // const {followings, followingsList} = this.state;
    // followings.splice(index,1);
    // this.setState({...this.state, followings:followings}, ()=>{
    //   socket.emit(REST_REQUEST,{
    //     method: "del",
    //     url: `${url}/organizations/follows/?follow_followed=${followingsList[index].follow_followed}`,
    //     result: `organizationFollowing-delete`,
    //     token: TOKEN
    //   })
    // });    
  }
  deleteExchange(id:number, index:number){ //TODO
    // const {exchanges} = this.state;
    // exchanges.splice(index,1);
    // this.setState({...this.state, exchanges:exchanges}, ()=>{
      
    // });   
  }

  render() {
    const {createForm} = this.state;
    const {followers,followings,exchanges} = this.props.organization;
    let user =null
    return (
      <VerifyWrapper isLoading={exchanges.isLoading || followers.isLoading || followings.isLoading} error={exchanges.error || followers.error || followings.error}>
        <CategoryTitle
          title={__('Socials')}
        />
        <FrameCard className="-frameCardSocial">
          <ExchangesView deleteExchange ={this.deleteExchange.bind(this)} exchanges = {exchanges.content} user={user}/>
          <FollowersView followers = {followers.content} user={user}/>
          <FollowingsView deleteFollowing = {this.deleteFollowing.bind(this)} followings = {followings.content} user={user}/>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
	organization:state.organization,
  auth:state.auth,
  
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
    getFollowings: OrganizationActions.getOrgFollowings ,
    getFollowers: OrganizationActions.getOrgFollowers,
    getExchanges: OrganizationActions.getOrgExchanges,
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Socials)
