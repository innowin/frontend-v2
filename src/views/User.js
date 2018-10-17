// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import BadgeActions from "src/redux/actions/commonActions/badgeActions"
import Certificates from "./common/certificates/index"
import ChatBar from "src/views/bars/ChatBar"
import Educations from "src/views/user/educations"
import GetUserActions from "src/redux/actions/user/getUserActions"
import GetIdentityActions from "src/redux/actions/identityActions"
import Posts from "src/views/common/post/index"
import PostExtendedView from 'src/views/common/post/PostView'
import PrivateRoute from "../consts/PrivateRoute"
import Contributions from "./common/contributions"
import Social from "src/views/common/social/index"
import TopBar from "src/views/bars/TopBar"
import UserBasicInformation from "./user/basicInformation/index"
import WorkExperiences from "./user/workExperience/index"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {Tabs, VerifyWrapper} from "./common/cards/Frames"
import {
  InformationIcon,
  ContributionIcon,
  CertificateIcon,
  workExperienceIcon,
  postIcon,
  SocialIcon,
  EducationIcon
} from "src/images/icons"
import {UserSideBar} from "./bars/SideBar"
import type {
  profileStateObject,
  userStateObject,
  identityStateObject,
  listOfIdObject
} from "src/consts/flowTypes/stateObjectType"
import type {badgeType} from "src/consts/flowTypes/common/badges"
import constants from "src/consts/constants"
import ParamActions from "../redux/actions/paramActions"
import type {fileType} from "../consts/flowTypes/common/fileType";

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
    removeParamUserId: Function,
    setParamUserId: Function,
  },
  translate: {},
  profileObject: profileStateObject,
  profileBanner:fileType | {},
  profileMedia: fileType | {},
  userObject: userStateObject,
  identityObject: identityStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
}

class User extends Component<PropsUser> {

  static propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }
  firstGetBadges: boolean

  constructor(props) {
    super(props)
    this.firstGetBadges = true
  }

  componentDidUpdate(prevProps) {
    const {params} = this.props.match
    const userId: number = +params.id
    const {identityObject, actions} = this.props
    const {getUserByUserId, getProfileByUserId, getUserIdentity, setParamUserId} = actions

    if (+prevProps.match.params.id !== userId) {
      getUserByUserId(userId)
      getProfileByUserId(userId)
      getUserIdentity(userId)
      setParamUserId({id: userId})
    }

    if (this.firstGetBadges && identityObject.content && prevProps.identityObject !== identityObject) {
      const {params} = this.props.match
      const userId: number = +params.id
      const {getUserBadges} = actions
      getUserBadges(userId, identityObject.content)
      this.firstGetBadges = false
    }
  }

  componentDidMount() {
    const {params} = this.props.match
    const {getUserByUserId, getProfileByUserId, getUserIdentity, setParamUserId} = this.props.actions
    const userId: number = +params.id
    getUserByUserId(userId)
    getProfileByUserId(userId)
    getUserIdentity(userId)
    setParamUserId({id: userId})
  }

  componentWillUnmount() {
    const {removeParamUserId} = this.props.actions
    removeParamUserId()
  }

  render() {
    const {match, translate, profileObject,profileBanner, profileMedia, userObject, identityObject, badgesObject, badges} = this.props
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
            {!identityObject.content ? '' : (
                <UserSideBar translate={translate}
                             user={userObject.content}
                             profile={profileObject.content}
                             profileBanner={profileBanner}
                             profileMedia = {profileMedia}
                             badges={badges}
                             className={`-right-sidebar-wrapper user-sidebar-width col pr-0 pl-0`}
                             paramId={userId}
                             identityId={identityObject.content}
                />
            )}
            <div className="col-md-6 col-sm-10 -content-wrapper">
              <Tabs>
                <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
                <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">
                  <InformationIcon/>
                </NavLink>
                <NavLink className="-tab" to={`${url}/contributions`}
                         activeClassName="-active"><ContributionIcon/></NavLink>
                <NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">
                  <SocialIcon/>
                </NavLink>
                {/* TODO: mohammad add education and its route*/}
                <NavLink className="-tab" to={`${url}/Educations`} activeClassName="-active">
                  <EducationIcon/>
                </NavLink>
                {/* FixMe: mohammad workExperiences and skills must be join to workExperiences and join their routes*/}
                <NavLink className="-tab" to={`${url}/WorkExperiences`}
                         activeClassName="-active">{workExperienceIcon}</NavLink>
                <NavLink className="-tab" to={`${url}/Certificates`}
                         activeClassName="-active"><CertificateIcon/></NavLink>
              </Tabs>
              {
                (!identityObject.content) ? '' : (
                    <Switch>
                      <Redirect exact from={`${url}/`} to={`${url}/Posts`}/>
                      <PrivateRoute exact={true} path={`${path}/Posts`} component={Posts} id={userId}
                                    identityType={constants.USER_TYPES.PERSON}
                                    profileMedia={profileObject.content.profile_media}
                                    postIdentity={identityObject.content}
                      />
                      <PrivateRoute path={`${path}/Posts/:id`} component={PostExtendedView}
                                    postIdentity={identityObject.content}
                                    extendedView={true}
                                    commentParentType= {constants.COMMENT_PARENT.POST}/>
                      <PrivateRoute path={`${path}/basicInformation`} component={UserBasicInformation} userId={userId}
                                    profile={profileObject} user={userObject}
                      />
                      <PrivateRoute path={`${path}/contributions`} component={Contributions}
                                    ownerId={userId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.PERSON}/>
                      <PrivateRoute path={`${path}/SocialConnections`} component={Social}
                                    ownerId={userId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.PERSON}
                      />
                      <PrivateRoute path={`${path}/Educations`} component={Educations} userId={userId}/>
                      <PrivateRoute path={`${path}/WorkExperiences`} component={WorkExperiences} userId={userId}/>
                      <PrivateRoute path={`${path}/Certificates`} component={Certificates}
                                    ownerId={userId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.PERSON}
                      />
                    </Switch>
                )
              }
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
  const stateUser = state.users.list[userId]
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const user = (stateUser && stateUser.user) || defaultObject
  const profile = (stateUser && stateUser.profile) || defaultObject
  const profileBannerId = stateUser.profileBannerId
  const profileMediaId = stateUser.profileMediaId
  const profileBanner = (profileBannerId && state.common.file.list[profileBannerId]) || {}
  const profileMedia = (profileMediaId && state.common.file.list[profileMediaId]) || {}
  const identity = (stateUser && stateUser.identity) || {content: null, isLoading: false, error: null}
  const badgesObjectInUser = (stateUser && stateUser.badges) || defaultObject2
  const allBadges = state.common.badges.badge.list
  const badges = badgesObjectInUser.content.map(badgeId => allBadges[badgeId])
  return {
    userObject: user,
    profileObject: profile,
    identityObject: identity,
    badgesObject: badgesObjectInUser,
    profileBanner,
    profileMedia,
    badges,
    translate: getMessages(state)
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getProfileByUserId: GetUserActions.getProfileByUserId,
    getUserIdentity: GetIdentityActions.getUserIdentity,
    getUserBadges: BadgeActions.getUserBadges,
    setParamUserId: ParamActions.setParamUserId,
    removeParamUserId: ParamActions.removeParamUserId,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(User)
