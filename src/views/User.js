// @flow
import * as React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import BadgeActions from 'src/redux/actions/commonActions/badgeActions'
import Certificates from './common/certificates/index'
import ChatBar from 'src/views/bars/ChatBar'
import Educations from 'src/views/user/educations'
import GetUserActions from 'src/redux/actions/user/getUserActions'
import GetIdentityActions from 'src/redux/actions/identityActions'
import Posts from 'src/views/common/post/index'
import PostExtendedView from 'src/views/common/post/PostView'
import PrivateRoute from '../consts/PrivateRoute'
import Contributions from './common/contributions'
import Social from 'src/views/common/social/index'
import TopBar from 'src/views/bars/TopBar'
import UserBasicInformation from './user/basicInformation/index'
import WorkExperiences from './user/workExperience/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink, Switch, Redirect } from 'react-router-dom'
import { Tabs, VerifyWrapper } from './common/cards/Frames'
import { Helmet } from 'react-helmet'
import {
  InformationIcon,
  ContributionIcon,
  CertificateIcon,
  workExperienceIcon,
  postIcon,
  SocialIcon,
  EducationIcon
} from 'src/images/icons'
import { UserSideBar } from './bars/SideBar'
import type {
  profileStateObject,
  userStateObject,
  identityStateObject,
  listOfIdObject
} from 'src/consts/flowTypes/stateObjectType'
import type { badgeType } from 'src/consts/flowTypes/common/badges'
import constants from 'src/consts/constants'
import ParamActions from '../redux/actions/paramActions'
import type { fileType } from '../consts/flowTypes/common/fileType'
import { getMessages } from '../redux/selectors/translateSelector'
import UserSkeleton from './user/skeleton/UserSkeleton'
import { Fragment } from 'react'
import Material from './common/components/Material'

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
  profileObject: profileStateObject,
  profileBanner: fileType | {},
  profileMedia: fileType | {},
  userObject: userStateObject,
  identityObject: identityStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
  translate: { [string]: string }
}

class User extends Component<PropsUser> {

  static propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }
  firstGetBadges: boolean

  constructor(props) {
    super(props)
    this.firstGetBadges = true
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match
    const userId: number = +params.id
    const { identityObject, actions } = this.props
    const { getUserByUserId, getProfileByUserId, getUserIdentity, setParamUserId } = actions

    if (+prevProps.match.params.id !== userId) {
      getUserByUserId(userId)
      getProfileByUserId(userId)
      getUserIdentity(userId)
      setParamUserId({ id: userId })
    }

    if (this.firstGetBadges && identityObject.content && prevProps.identityObject !== identityObject) {
      const { params } = this.props.match
      const userId: number = +params.id
      const { getUserBadges } = actions
      getUserBadges(userId, identityObject.content)
      this.firstGetBadges = false
    }
  }

  componentDidMount() {
    const { params } = this.props.match
    const { getUserByUserId, getProfileByUserId, getUserIdentity, setParamUserId } = this.props.actions
    const userId: number = +params.id
    getUserByUserId(userId)
    getProfileByUserId(userId)
    getUserIdentity(userId)
    setParamUserId({ id: userId })
  }

  componentWillUnmount() {
    const { removeParamUserId } = this.props.actions
    removeParamUserId()
  }

  render() {
    const { match, profileObject, profileBanner, profileMedia, userObject, identityObject, badgesObject, badges, translate } = this.props
    const { path, url, params } = match
    const userId: number = +params.id
    const isLoading = userObject.isLoading || profileObject.isLoading || identityObject.isLoading
        || badgesObject.isLoading
    const errorMessage = userObject.error || profileObject.error || identityObject.error
        || badgesObject.error

    // const title = `${translate['Danesh Boom']} - ${userObject.content.username}`
    // const description = translate['User']
    return (
        <div className="-userOrganBackgroundImg">
          {/*<TopBar collapseClassName="col user-sidebar-width"/>*/}
          {/*
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>

            <meta property="og:type" content="website"/>
            {profileMedia &&
            <meta property="og:image" content={profileMedia.file}/>
            }
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>

            <meta property="twitter:card" content="summary"/>
            {profileMedia &&
            <meta property="twitter:image" content={profileMedia.file}/>
            }
            <meta property="twitter:title" content={title}/>
            <meta property="twitter:description" content={description}/>

            <script type="application/ld+json">{`
              {
                "@context": "http://schema.org",
                "@type": "Person",
                "name": "${userObject.content.username}",
                "image": "${profileMedia && profileMedia.file}"
              }
            `}</script>

          </Helmet>
*/}
          {/*<VerifyWrapper isLoading={isLoading} error={errorMessage} className="-main row page-content">*/}
          {isLoading
              ? <UserSkeleton/>
              : <div className='-main page-content'>
                {!identityObject.content ? '' : (
                    <UserSideBar
                        user={userObject.content}
                        profile={profileObject.content}
                        profileBanner={profileBanner}
                        profileMedia={profileMedia}
                        badges={badges}
                        className={`col-md-3 col-sm-1 -right-sidebar-wrapper col pr-0 pl-0`}
                        paramId={userId}
                        identityId={identityObject.content}
                    />
                )}
                <div className="col-md-6 col-sm-10 center-column">
                  {/*<Tabs>*/}
                  {/*<NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>*/}
                  {/*<NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">*/}
                  {/*<InformationIcon/>*/}
                  {/*</NavLink>*/}
                  {/*<NavLink className="-tab" to={`${url}/contributions`}*/}
                  {/*activeClassName="-active"><ContributionIcon/></NavLink>*/}
                  {/*<NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">*/}
                  {/*<SocialIcon/>*/}
                  {/*</NavLink>*/}
                  {/*/!* TODO: mohammad add education and its route*!/*/}
                  {/*<NavLink className="-tab" to={`${url}/Educations`} activeClassName="-active">*/}
                  {/*<EducationIcon/>*/}
                  {/*</NavLink>*/}
                  {/*/!* FixMe: mohammad workExperiences and skills must be join to workExperiences and join their routes*!/*/}
                  {/*<NavLink className="-tab" to={`${url}/WorkExperiences`}*/}
                  {/*activeClassName="-active">{workExperienceIcon}</NavLink>*/}
                  {/*<NavLink className="-tab" to={`${url}/Certificates`}*/}
                  {/*activeClassName="-active"><CertificateIcon/></NavLink>*/}
                  {/*</Tabs>*/}

                  <div className='header-container'>

                    <NavLink to={`${url}/Posts`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content={translate['Stream']}/>
                    </NavLink>

                    <NavLink to={`${url}/basicInformation`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['About Me']}/>
                    </NavLink>

                    <NavLink to={`${url}/contributions`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Contributions']}/>
                    </NavLink>

                    <NavLink to={`${url}/SocialConnections`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Socials']}/>
                    </NavLink>

                    <NavLink to={`${url}/Educations`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Educations']}/>
                    </NavLink>

                    <NavLink to={`${url}/WorkExperiences`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['WorkExperience']}/>
                    </NavLink>

                    <NavLink to={`${url}/Certificates`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Certificates']}/>
                    </NavLink>

                  </div>


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
                                        commentParentType={constants.COMMENT_PARENT.POST}/>
                          <PrivateRoute path={`${path}/basicInformation`} component={UserBasicInformation}
                                        userId={userId}
                                        profile={profileObject} user={userObject}
                          />
                          <PrivateRoute path={`${path}/contributions`} component={Contributions}
                                        ownerId={userId}
                                        identityId={identityObject.content}
                                        identityType={constants.USER_TYPES.PERSON}
                                        isUser={true}/>
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
              </div>
          }
          {/*</VerifyWrapper>*/}
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.match
  const userId = +params.id
  const stateUser = state.users.list[userId]
  const defaultObject = { content: {}, isLoading: false, error: null }
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const user = (stateUser && stateUser.user) || defaultObject
  const profile = (stateUser && stateUser.profile) || defaultObject
  const profileBannerId = (stateUser && stateUser.profileBannerId) || (profile.content && profile.content.profile_banner && profile.content.profile_banner.id)
  const profileMediaId = (stateUser && stateUser.profileMediaId) || (profile.content && profile.content.profile_media && profile.content.profile_media.id)
  const profileBanner = (profileBannerId && state.common.file.list[profileBannerId]) || {}
  const profileMedia = (profileMediaId && state.common.file.list[profileMediaId]) || {}
  const identity = (stateUser && stateUser.identity) || { content: null, isLoading: false, error: null }
  const badgesObjectInUser = (stateUser && stateUser.badges) || defaultObject2
  const allBadges = state.common.badges.badge.list
  const badges = badgesObjectInUser.content.map(badgeId => allBadges[badgeId])
  return {
    userObject: user,
    profileObject: profile,
    identityObject: identity,
    badgesObject: badgesObjectInUser,
    profileBanner,
    translate: getMessages(state),
    profileMedia,
    badges
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getProfileByUserId: GetUserActions.getProfileByUserId,
    getUserIdentity: GetIdentityActions.getUserIdentity,
    getUserBadges: BadgeActions.getUserBadges,
    setParamUserId: ParamActions.setParamUserId,
    removeParamUserId: ParamActions.removeParamUserId
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(User)
