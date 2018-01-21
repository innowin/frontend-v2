import React, {Component} from "react"
import Career from "./user/career/index"
import Certificates from "./user/certificates/index"
import ChatBar from "src/views/bars/ChatBar"
import Posts from "./user/Posts"
import PropsRoute from "../consts/PropsRoute"
import Sidebar from "src/views/bars/SideBar"
import Skills from "./user/skills/index"
import TopBar from "src/views/bars/TopBar"
import UserBasicInformation from "./user/basicInformation/index"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {Tabs} from "./common/cards/Frames"
import {userInfoIcon, skillIcon, certificateIcon, workExperienceIcon, postIcon} from "src/images/icons"

class User extends Component {

  render() {
    const {match, handleSignOut} = this.props;
    const {path, url, params} = match;
    const userId = params.id;
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut}/>

        <main className="row">
          <div className="col-3 -right-sidebar-wrapper">
            <Sidebar>
            </Sidebar>
          </div>
          <div className="col-6 -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">{userInfoIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Career`} activeClassName="-active">{workExperienceIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Skills`} activeClassName="-active">{skillIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active">{certificateIcon}</NavLink>
            </Tabs>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
              <PropsRoute path={`${path}/basicInformation`} component={UserBasicInformation} userId={userId}/>
              <PropsRoute path={`${path}/Posts`} component={Posts}  userId={userId}/>
              <PropsRoute path={`${path}/Career`} component={Career} userId={userId}/>
              <PropsRoute path={`${path}/Skills`} component={Skills}  userId={userId}/>
              <PropsRoute path={`${path}/Certificates`} component={Certificates} userId={userId}/>
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