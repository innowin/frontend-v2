// @flow
import * as React from 'react'
import BadgeActions from 'src/redux/actions/commonActions/badgeActions'
import Certificates from './common/certificates/index'
import ChatBar from 'src/views/bars/ChatBar'
import constants from 'src/consts/constants'
import Contributions from './common/contributions'
import Educations from 'src/views/user/educations'
import GetUserActions from 'src/redux/actions/user/getUserActions'
import Material from './common/components/Material'
import ParamActions from '../redux/actions/paramActions'
import PostExtendedView from 'src/views/common/post/PostView'
import Posts from 'src/views/common/post/index'
import PrivateRoute from '../consts/PrivateRoute'
import PropTypes from 'prop-types'
import Social from 'src/views/common/social/index'
import Following from 'src/views/common/social/following/index'
import Follower from 'src/views/common/social/follower/index'
import type {badgeType} from 'src/consts/flowTypes/common/badges'
import type {fileType} from '../consts/flowTypes/common/fileType'
import type {userStateObject, listOfIdObject} from 'src/consts/flowTypes/stateObjectType'
import UserBasicInformation from './user/basicInformation/index'
import UserSkeleton from './user/skeleton/UserSkeleton'
import WorkExperiences from './user/workExperience/index'
import {bindActionCreators} from 'redux'
import {Component} from 'react'
import {connect} from 'react-redux'
import {getMessages} from '../redux/selectors/translateSelector'
import {NavLink, Switch, Redirect} from 'react-router-dom'
import SideBarContent from './bars/SideBar'

type PropsUser = {
  match: {
    [string]: string,
    params: { [string]: string },
  },
  actions: {
    getUserByUserId: Function,
    getUserBadges: Function,
    removeParamUserId: Function,
    setParamUserId: Function,
  },
  profileBanner: fileType | {},
  profileMedia: fileType | {},
  userObject: userStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
  translate: { [string]: string }
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
    const {userObject, actions} = this.props
    const {getUserByUserId, setParamUserId} = actions

    if (+prevProps.match.params.id !== userId) {
      getUserByUserId(userId)
      setParamUserId({id: userId})
    }

    if (this.firstGetBadges && userObject.id && prevProps.userObject !== userObject) {
      const {params} = this.props.match
      const userId: number = +params.id
      const {getUserBadges} = actions
      getUserBadges(userId, userObject.id)
      this.firstGetBadges = false
    }
  }

  componentDidMount() {
    const {params} = this.props.match
    const {getUserByUserId, setParamUserId} = this.props.actions
    const userId: number = +params.id
    getUserByUserId(userId)
    setParamUserId({id: userId})
  }

  componentWillUnmount() {
    const {removeParamUserId} = this.props.actions
    removeParamUserId()
  }

  render() {
    const {match, userObject, badgesObject, badges, translate} = this.props
    const {path, url, params} = match
    const userId: number = +params.id
    const isLoading = userObject.isLoading || badgesObject.isLoading

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
                <SideBarContent
                    sideBarType={constants.USER_TYPES.USER}
                    className='col-md-3 col-sm-1 -right-sidebar-wrapper col pr-0 pl-0'
                    badges={badges}
                    paramId={userId}
                    owner={userObject}
                />


                <div className="col-md-6 col-sm-10 center-column">

                  <div className='header-container'>

                    <NavLink to={`${url}/Posts`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first'
                                content={translate['Stream']}/>
                    </NavLink>

                    <NavLink to={`${url}/basicInformation`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['About Me']}/>
                    </NavLink>

                    <NavLink to={`${url}/contributions`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['Contributions']}/>
                    </NavLink>

                    <NavLink to={`${url}/SocialConnections`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['Exchanges']}/>
                    </NavLink>

                    <NavLink to={`${url}/Followings`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['Followings']}/>
                    </NavLink>

                    <NavLink to={`${url}/Followers`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['Followers']}/>
                    </NavLink>

                    <NavLink to={`${url}/Educations`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['Educations']}/>
                    </NavLink>

                    <NavLink to={`${url}/WorkExperiences`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['WorkExperience']}/>
                    </NavLink>

                    <NavLink to={`${url}/Certificates`} className='header-container-item'
                             activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                content={translate['Certificates']}/>
                    </NavLink>

                  </div>
                  <Switch>
                    <Redirect exact from={`${url}/`} to={`${url}/Posts`}/>
                    <PrivateRoute exact={true} path={`${path}/Posts`} component={Posts} id={userId}
                                  identityType={constants.USER_TYPES.USER}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/Posts/:id`} component={PostExtendedView}
                                  extendedView={true}
                                  commentParentType={constants.COMMENT_PARENT.POST}/>
                    <PrivateRoute path={`${path}/basicInformation`} component={UserBasicInformation}
                                  userId={userId}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/contributions`} component={Contributions}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.USER}
                                  isUser={true}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/SocialConnections`} component={Social}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.USER}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/Followings`} component={Following}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.USER}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/Followers`} component={Follower}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.USER}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/Educations`} component={Educations} userId={userId}/>
                    <PrivateRoute path={`${path}/WorkExperiences`} component={WorkExperiences} userId={userId}/>
                    <PrivateRoute path={`${path}/Certificates`} component={Certificates}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.USER}
                                  user={userObject}
                    />
                  </Switch>
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
  const {params} = ownProps.match
  const userId = +params.id
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const user = state.identities.list[userId] || defaultObject
  const profileBannerId = (user && user.profile_banner)
  const profileMediaId = (user && user.profile_media)
  const profileBanner = (profileBannerId && state.common.file.list[profileBannerId]) || {}
  const profileMedia = (profileMediaId && state.common.file.list[profileMediaId]) || {}
  const badgesObjectInUser = (user && user.badges) || defaultObject2
  const allBadges = state.common.badges.badge.list
  const badges = badgesObjectInUser.content.map(badgeId => allBadges[badgeId])
  return {
    userObject: user,
    badgesObject: badgesObjectInUser,
    profileBanner,
    translate: getMessages(state),
    profileMedia,
    badges,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getUserBadges: BadgeActions.getUserBadges,
    setParamUserId: ParamActions.setParamUserId,
    removeParamUserId: ParamActions.removeParamUserId,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(User)
