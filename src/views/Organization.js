// @flow
import React from 'react'
import {Component} from 'react'

import BadgeActions from 'src/redux/actions/commonActions/badgeActions'
import Certificates from './common/certificates/index'
import ChatBar from './bars/ChatBar'
import Customers from './organization/customers/index'
import Posts from 'src/views/common/post/index'
import PostExtendedView from 'src/views/common/post/PostView'
import PrivateRoute from '../consts/PrivateRoute'
import PropTypes from 'prop-types'
import Social from 'src/views/common/social/index'
import Followings from 'src/views/common/social/following/index'
import Followers from 'src/views/common/social/follower/index'
import type {badgeType} from 'src/consts/flowTypes/common/badges'
import type {identityStateObject, listOfIdObject, organStateObject} from 'src/consts/flowTypes/stateObjectType'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import OrganizationBasicInformation from './organization/basicInformation/index'
import {NavLink, Switch, Redirect} from 'react-router-dom'
import constants from '../consts/constants'
import ParamActions from 'src/redux/actions/paramActions'
import Contributions from './common/contributions'
import Material from 'src/views/common/components/Material'
import {getMessages} from '../redux/selectors/translateSelector'
import SideBarContent from './bars/SideBar'
import GetUserActions from '../redux/actions/user/getUserActions'
import UserSkeleton from './user/skeleton/UserSkeleton'
import OrganAboutUs from 'src/views/organization/aboutUs'

type PropsOrganization = {
  userObject: organStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
  match: {
    [string]: string,
    params: { [string]: string }
  },
  actions: {
    getUserByUserId: Function,
    getUserBadges: Function,
    removeParamUserId: Function,
    setParamUserId: Function,
  },
  identityObject: identityStateObject,
  translate: { [string]: string | {} },
}

export class Organization extends Component<PropsOrganization> {
  static propTypes = {
    userObject: PropTypes.object.isRequired,
    badgesObject: PropTypes.object.isRequired,
    badges: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  firstGetBadges: boolean

  constructor(props: PropsOrganization) {
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

    return (
        <div className="-userOrganBackgroundImg">

          {isLoading
              ? <UserSkeleton/>
              :
              <div className='-main page-content'>
                <SideBarContent
                    sideBarType={constants.USER_TYPES.ORG}
                    className='col-md-3 col-sm-1 -right-sidebar-wrapper col pr-0 pl-0'
                    badges={badges}
                    paramId={userId}
                    owner={userObject}
                />

                <div className="col-md-6 col-sm-10 center-column">

                  <div className='header-container'>

                    <NavLink to={`${url}/Posts`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Stream']}/>
                    </NavLink>

                    {/*<NavLink to={`${url}/contributions`} className='header-container-item' activeClassName='header-container-item-active'>*/}
                      {/*<Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content={translate['Contributions']}/>*/}
                    {/*</NavLink>*/}

                    <NavLink to={`${url}/basicInformation`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['About Us']}/>
                    </NavLink>

                    <NavLink to={`${url}/Followers`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Followers']}/>
                    </NavLink>

                    <NavLink to={`${url}/Followings`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Followings']}/>
                    </NavLink>

                    <NavLink to={`${url}/Exchanges`} className='header-container-item' activeClassName='header-container-item-active'>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Exchanges']}/>
                    </NavLink>

                    {/*<NavLink to={`${url}/Customers`} className='header-container-item' activeClassName='header-container-item-active'>*/}
                      {/*<Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Customers']}/>*/}
                    {/*</NavLink>*/}

                    {/*<NavLink to={`${url}/Certificates`} className='header-container-item' activeClassName='header-container-item-active'>*/}
                      {/*<Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Certificates']}/>*/}
                    {/*</NavLink>*/}

                  </div>
                  <Switch>
                    <Redirect exact from={`${url}/`} to={`${url}/Posts`}/>
                    <PrivateRoute path={`${path}/contributions`}
                                  component={Contributions}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.ORG}
                                  isUser={false}
                    />
                    <PrivateRoute exact={true} path={`${path}/Posts`} component={Posts}
                                  id={userId}
                                  identityType={constants.USER_TYPES.ORG}
                    />
                    <PrivateRoute path={`${path}/Posts/:id`} component={PostExtendedView}
                                  extendedView={true}
                                  commentParentType={constants.COMMENT_PARENT.POST}
                    />
                    <PrivateRoute exact path={`${path}/basicInformation`}
                                  component={OrganAboutUs}
                                  organizationId={userId}
                                  organization={userObject}
                    />
                    <PrivateRoute path={`${path}/SocialConnections`} component={Social}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.ORG}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/Followings`} component={Followings}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.ORG}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/Followers`} component={Followers}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.ORG}
                                  user={userObject}
                    />
                    <PrivateRoute path={`${path}/Customers`} component={Customers}
                                  organizationId={userId}
                    />
                    <PrivateRoute path={`${path}/Certificates`} component={Certificates}
                                  ownerId={userId}
                                  identityType={constants.USER_TYPES.ORG}
                                  user={userObject}
                    />
                  </Switch>
                </div>
                <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
                  <ChatBar/>
                </div>
              </div>
          }
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
export default connect(mapStateToProps, mapDispatchToProps)(Organization)