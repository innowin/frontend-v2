import React, {Component} from "react"
import Career from "./user/Career"
import Certificates from "./user/Certificates"
import ChatBar from "src/views/bars/ChatBar"
import Posts from "./user/Posts"
import PropsRoute from "../consts/PropsRoute"
import Skills from "./user/Skills"
import TopBar from "src/views/bars/TopBar"
import UserBasicInformation from "./user/basicInformation/index"
import {ID} from "../consts/data"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {Tabs} from "src/views/common/cards/Frames"
import {userInfoIcon, skillIcon, certificateIcon, workExperienceIcon, postIcon} from "src/images/icons"
import Sidebar from "bars/SideBar"
import {VerifyWrapper} from "./common/cards/Frames"
import {REST_REQUEST} from "../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../consts/URLS"


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

//   componentDidMount(){
//   const {userId} = this.props;
//   const emitting = () => {
//   const newState = {...this.state, isLoading: true};
//   this.setState(newState);
//   socket.emit(REST_REQUEST,
// {
//   method: "get",
//   url: `${url}/users/${userId}/`,
//   result: `UserInfo-get/${userId}`,
//   token: "",
// }
//   );
// };
//
//   emitting();
//
//   socket.on(`UserInfo-get/${userId}`, (res) => {
//   if (res.detail) {
//   const newState = {...this.state, error: res.detail, isLoading: false};
//   this.setState(newState);
// }
//   const newState = {...this.state, user: res, isLoading: false};
//   this.setState(newState);
// });
// }

  render() {
    const {match, socket, handleSignOut} = this.props;
    const {path, url} = match;
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut}/>

        <main className="row">
          <div className="col-3 -right-sidebar-wrapper">
            <Sidebar/>
          </div>
          <div className="col-6 -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">
                {userInfoIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Career`} activeClassName="-active">{workExperienceIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Skills`} activeClassName="-active">{skillIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active">
                {certificateIcon}
              </NavLink>
            </Tabs>
            <Switch>
              <Redirect exact from={`${path}/`} to={`${path}/basicInformation`}/>
              <PropsRoute path={`${path}/basicInformation`} component={UserBasicInformation} socket={socket}
                          userId={ID}/>
              <PropsRoute path={`${path}/Posts`} component={Posts} socket={socket} userId={ID}/>
              <PropsRoute path={`${path}/Career`} component={Career} socket={socket} userId={ID}/>
              <PropsRoute path={`${path}/Skills`} component={Skills} socket={socket} userId={ID}/>
              <PropsRoute path={`${path}/Certificates`} component={Certificates} socket={socket} userId={ID}/>
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

export default User;