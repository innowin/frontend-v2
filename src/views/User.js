// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import WorkExperiences from "./user/workExperience/index"
import Certificates from "./user/certificates/index"
import ChatBar from "src/views/bars/ChatBar"
import Posts from "src/views/common/post/index"
import PrivateRoute from "../consts/PrivateRoute"
import Sidebar from "src/views/bars/SideBar"
import Skills from "./user/skills/index"
import Social from "src/views/user/social/index"
import TopBar from "src/views/bars/TopBar"
import UserBasicInformation from "./user/basicInformation/index"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {Tabs} from "./common/cards/Frames"
import {SkillIcon, CertificateIcon, workExperienceIcon, postIcon, SocialIcon, InformationIcon} from "src/images/icons"
import {UserSideView} from "./bars/SideBar"
// import ReduxTest from './reduxTest'

type PropsUser = {
  match: {},
  handleSignOut: Function
}

class User extends Component<PropTypes> {

  static propTypes = {
    match: PropTypes.object.isRequired,
    handleSignOut: PropTypes.func.isRequired
  }

  render() {
    {/* TODO: fake*/}
    const {match, handleSignOut} = this.props
    const {path, url, params} = match
    const userId: number = +params.id
    const widthOfRightBar = "col-3"
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut} collapseWidthCol={widthOfRightBar}/>

        <main className="row">

          <div className={`-right-sidebar-wrapper ${widthOfRightBar}`}>
            <Sidebar>
              <UserSideView userId={userId}/>
              {/*<ReduxTest/>*/}

            </Sidebar>
          </div>
          <div className="col-6 -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">
                <InformationIcon/>
              </NavLink>
              {/* TODO: mohammad add contributions and its route*/}
              <NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">
                <SocialIcon/>
              </NavLink>
              {/* TODO: mohammad add education and its route*/}
              {/* FixMe: mohammad workExperiences and skills must be join to workExperiences and join their routes*/}
              <NavLink className="-tab" to={`${url}/WorkExperiences`} activeClassName="-active">{workExperienceIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Skills`} activeClassName="-active"><SkillIcon/></NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`}
                       activeClassName="-active"><CertificateIcon/></NavLink>
            </Tabs>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/Posts`}/>
              <PrivateRoute path={`${path}/Posts`} component={Posts} id={userId} identityType='user'/>
              <PrivateRoute path={`${path}/basicInformation`} component={UserBasicInformation} userId={userId}/>
              <PrivateRoute path={`${path}/SocialConnections`} component={Social} userId={userId}/>
              <PrivateRoute path={`${path}/WorkExperiences`} component={WorkExperiences} userId={userId}/>
              <PrivateRoute path={`${path}/Skills`} component={Skills} userId={userId}/>
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

export default (props: PropsUser): React.Element<typeof User> => {
  const match = props.match
  const handleSignOut = props.handleSignOut
  return <User match={match} handleSignOut={handleSignOut}/>
}
