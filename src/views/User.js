// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import Certificates from "./user/certificates/index"
import ChatBar from "src/views/bars/ChatBar"
import Posts from "src/views/common/post/index"
import PrivateRoute from "../consts/PrivateRoute"
import Skills from "./user/skills/index"
import Social from "src/views/user/social/index"
import TopBar from "src/views/bars/TopBar"
import UserBasicInformation from "./user/basicInformation/index"
import GetUserActions from "src/redux/actions/user/getUserActions"
import WorkExperiences from "./user/workExperience/index"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {Tabs} from "./common/cards/Frames"
import {userInfoIcon, SkillIcon, CertificateIcon, workExperienceIcon, postIcon, SocialIcon} from "src/images/icons"
import {UserSideBar} from "./bars/SideBar"

type PropsUser = {
  match: {
    [string]: string,
    params: { [string]: string }
  },
  actions: {
    getUserByUserId: Function,
    getProfileByUserId: Function
  },
  translate: {},
  profileObject: {},
  userObject: {}
}

class User extends Component<PropsUser> {

  static propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {params} = this.props.match
    const userId: number = +params.id
    const {getUserByUserId, getProfileByUserId} = this.props.actions
    getUserByUserId(userId)
    getProfileByUserId(userId)
  }

  render() {
    const {match, translate, profileObject, userObject} = this.props
    const {path, url, params} = match
    const userId: number = +params.id
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar collapseClassName="col user-sidebar-width"/>
        <main className="row">
          <UserSideBar translate={translate} profileObject={profileObject} userObject={userObject}
                       className={`-right-sidebar-wrapper user-sidebar-width col pr-0 pl-0`}/>
          <div className="col-md-6 col-sm-10 -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/basicInformation`}
                       activeClassName="-active">{userInfoIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/WorkExperiences`}
                       activeClassName="-active">{workExperienceIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">
                <SocialIcon/>
              </NavLink>
              <NavLink className="-tab" to={`${url}/Skills`} activeClassName="-active"><SkillIcon/></NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`}
                       activeClassName="-active"><CertificateIcon/></NavLink>
            </Tabs>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
              <PrivateRoute path={`${path}/basicInformation`} component={UserBasicInformation} userId={userId}/>
              <PrivateRoute path={`${path}/Posts`} component={Posts} id={userId} identityType='user'/>
              <PrivateRoute path={`${path}/WorkExperiences`} component={WorkExperiences} userId={userId}/>
              <PrivateRoute path={`${path}/SocialConnections`} component={Social} userId={userId}/>
              <PrivateRoute path={`${path}/Skills`} component={Skills} userId={userId}/>
              <PrivateRoute path={`${path}/Certificates`} component={Certificates} userId={userId}/>
            </Switch>
          </div>

          <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {params} = ownProps.match
  const userId = +params.id
  const user = state.users[userId] ? state.users[userId].user : {
    // this object is default value for user object
    content: {},
    isLoading: false,
    error: {
      message: null
    }
  }
  const profile = state.users[userId] ? state.users[userId].profile : {
    // this object is default value for profile object
    content: {},
    isLoading: false,
    error: {
      message: null
    }
  }
  return {
    userObject: user,
    profileObject: profile,
    translate: getMessages(state)
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getProfileByUserId: GetUserActions.getProfileByUserId
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(User)
