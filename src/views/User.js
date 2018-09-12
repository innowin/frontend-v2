// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import BadgeActions from "src/redux/actions/commonActions/badgeActions"
import Certificates from "./user/certificates/index"
import ChatBar from "src/views/bars/ChatBar"
import GetUserActions from "src/redux/actions/user/getUserActions"
import GetIdentityActions from "src/redux/actions/identityActions"
import Posts from "src/views/common/post/index"
import PrivateRoute from "../consts/PrivateRoute"
import Skills from "./user/skills/index"
import Social from "src/views/user/social/index"
import TopBar from "src/views/bars/TopBar"
import UserBasicInformation from "./user/basicInformation/index"
import WorkExperiences from "./user/workExperience/index"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {Tabs, VerifyWrapper} from "./common/cards/Frames"
import {InformationIcon, SkillIcon, CertificateIcon, workExperienceIcon, postIcon, SocialIcon} from "src/images/icons"
import {UserSideBar} from "./bars/SideBar"
import type {
  profileStateObject,
  userStateObject,
  identityStateObject,
  listOfIdObject
} from "src/consts/flowTypes/stateObjectType"
import type {badgeType} from "src/consts/flowTypes/common/badges"
import constants from 'src/consts/constants'

type PropsUser = {
  match: {
    [string]: string,
    params: { [string]: string },
  },
  actions: {
    getUserByUserId: Function,
    getProfileByUserId: Function,
    getUserIdentity: Function,
    getUserBadges: Function,
  },
  translate: {},
  profileObject: profileStateObject,
  userObject: userStateObject,
  identityObject: identityStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
}

class User extends Component<PropsUser> {

  static propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }
  firstGetBadges: boolean

  constructor(props) {
    super(props)
    this.firstGetBadges = true;
  }

  componentDidUpdate(prevProps) {
    const {params} = this.props.match
    const userId: number = +params.id
    const {identityObject, actions} = this.props
    const {getUserByUserId, getProfileByUserId, getUserIdentity} = actions

    if(+prevProps.match.params.id !== userId){
      getUserByUserId(userId)
      getProfileByUserId(userId)
      getUserIdentity(userId)
    }

    if (this.firstGetBadges && identityObject.content.id && prevProps.identityObject !== identityObject) {
      const {params} = this.props.match
      const userId: number = +params.id
      const {getUserBadges} = actions
      getUserBadges(userId, identityObject.content.id)
      this.firstGetBadges = false
    }
  }

  componentDidMount() {
    const {params} = this.props.match
    const userId: number = +params.id
    const {getUserByUserId, getProfileByUserId, getUserIdentity} = this.props.actions
    getUserByUserId(userId)
    getProfileByUserId(userId)
    getUserIdentity(userId)
  }

  render() {
    const {match, translate, profileObject, userObject, identityObject, badgesObject, badges} = this.props
    {/* TODO: fake*/}
    const {path, url, params} = match
    const userId: number = +params.id
    const isLoading = userObject.isLoading || profileObject.isLoading || identityObject.isLoading
      || badgesObject.isLoading
    const errorMessage = userObject.error || profileObject.error || identityObject.error
      || badgesObject.error
    return (
      <div className="-userOrganBackgroundImg">
        <TopBar collapseClassName="col user-sidebar-width"/>
        <VerifyWrapper isLoading={isLoading} error={errorMessage} className="-main row">
          <UserSideBar translate={translate}
                       user={userObject.content}
                       profile={profileObject.content}
                       badges={badges}
                       className={`-right-sidebar-wrapper user-sidebar-width col pr-0 pl-0`}/>
          <div className="col-md-6 col-sm-10 -content-wrapper">
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
              <NavLink className="-tab" to={`${url}/WorkExperiences`}
                       activeClassName="-active">{workExperienceIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Skills`} activeClassName="-active"><SkillIcon/></NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`}
                       activeClassName="-active"><CertificateIcon/></NavLink>
            </Tabs>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/Posts`}/>
              <PrivateRoute path={`${path}/Posts`} component={Posts} id={userId} identityType={constants.USER_TYPES.PERSON}
                            profileMedia={profileObject.content.profile_media} postIdentity={identityObject.content.id}
              />
              <PrivateRoute path={`${path}/basicInformation`} component={UserBasicInformation} userId={userId}
                            profile={profileObject} user={userObject}
              />
              <PrivateRoute path={`${path}/SocialConnections`} component={Social}
                            userId={userId}
                            identityId={identityObject.content.id}
                            identityType={constants.USER_TYPES.PERSON}
              />
              <PrivateRoute path={`${path}/WorkExperiences`} component={WorkExperiences} userId={userId}/>
              <PrivateRoute path={`${path}/Skills`} component={Skills} userId={userId}/>
              <PrivateRoute path={`${path}/Certificates`} component={Certificates} userId={userId}/>
            </Switch>
          </div>

          <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
        </VerifyWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {params} = ownProps.match
  const userId = +params.id
  const stateUser = state.users[userId]
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const user = (stateUser && stateUser.user) || defaultObject
  const profile = (stateUser && stateUser.profile) || defaultObject
  const identity = (stateUser && stateUser.identity) || defaultObject
  const badgesObjectInUser = (stateUser && stateUser.badges) || defaultObject2
  const allBadges = state.common.badge.list
  const badges = badgesObjectInUser.content.map(badgeId => allBadges[badgeId])
  return {
    userObject: user,
    profileObject: profile,
    identityObject: identity,
    badgesObject: badgesObjectInUser,
    badges,
    translate: getMessages(state)
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getProfileByUserId: GetUserActions.getProfileByUserId,
    getUserIdentity: GetIdentityActions.getUserIdentity,
    getUserBadges: BadgeActions.getUserBadges
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(User)
