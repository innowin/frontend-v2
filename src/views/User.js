import React, {Component} from "react"
import PropTypes from "prop-types"

import Career from "./user/career/index"
import Certificates from "./user/certificates/index"
import ChatBar from "src/views/bars/ChatBar"
import Posts from "src/views/common/post/index"
import PrivateRoute from "../consts/PrivateRoute"
import Sidebar from "src/views/bars/SideBar"
import Skills from "./user/skills/index"
import Social from "src/views/user/social/index";
import TopBar from "src/views/bars/TopBar"
import UserBasicInformation from "./user/basicInformation/index"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {Tabs} from "./common/cards/Frames"
import {userInfoIcon, SkillIcon, CertificateIcon, workExperienceIcon, postIcon, SocialIcon} from "src/images/icons"
import {UserSideView} from "./bars/SideBar";

class User extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    handleSignOut: PropTypes.func.isRequired
  };

  render() {
    const {match, handleSignOut} = this.props;
    const {path, url, params} = match;
    const userId = params.id;
    const widthOfRightBar = "col-3";
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut} collapseWidthCol={widthOfRightBar}/>

        <main className="row">
          <div className={`-right-sidebar-wrapper ${widthOfRightBar}`}>
            <Sidebar>
              <UserSideView userId={userId}/>
            </Sidebar>
          </div>
          <div className="col-6 -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">{userInfoIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Career`} activeClassName="-active">{workExperienceIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">
                <SocialIcon/>
              </NavLink>
              <NavLink className="-tab" to={`${url}/Skills`} activeClassName="-active"><SkillIcon /></NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active"><CertificateIcon /></NavLink>
            </Tabs>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
              <PrivateRoute path={`${path}/basicInformation`} component={UserBasicInformation} userId={userId}/>
              <PrivateRoute path={`${path}/Posts`} component={Posts} id={userId} identityType='user'/>
              <PrivateRoute path={`${path}/Career`} component={Career} userId={userId}/>
              <PrivateRoute path={`${path}/SocialConnections`} component={Social} userId={userId}/>
              <PrivateRoute path={`${path}/Skills`} component={Skills}  userId={userId}/>
              <PrivateRoute path={`${path}/Certificates`} component={Certificates} userId={userId}/>
            </Switch>
          </div>
          
          <div className="col-3 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
        </main>
      </div>
    )
  }

}

export default (props) => {
  const match = props.match;
  const handleSignOut = props.handleSignOut;
  return <User match={match} handleSignOut={handleSignOut}/>
};