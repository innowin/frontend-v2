// @flow
import * as React from 'react'
import BadgeActions from 'src/redux/actions/commonActions/badgeActions'
import ChatBar from '../bars/ChatBar'
import Posts from 'src/views/common/post/index'
import PostExtendedView from 'src/views/common/post/PostView'
import * as PropTypes from 'prop-types'
import Social from 'src/views/common/social/index'
import Followings from 'src/views/common/social/following/index'
import Followers from 'src/views/common/social/follower/index'
import type {badgeType} from 'src/consts/flowTypes/common/badges'
import type {identityStateObject, listOfIdObject, organStateObject} from 'src/consts/flowTypes/stateObjectType'
import {bindActionCreators} from 'redux'
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {NavLink, Switch, Redirect} from 'react-router-dom'
import constants from 'src/consts/constants'
import ParamActions from 'src/redux/actions/paramActions'
import Material from 'src/views/common/components/Material'
import {getMessages} from 'src/redux/selectors/translateSelector'
import SideBarContent from '../bars/SideBar'
import GetUserActions from 'src/redux/actions/user/getUserActions'
import UserSkeleton from '../user/skeleton/UserSkeleton'
import OrganAboutUs from 'src/views/organization/aboutUs'
import RightArrowSvg from 'src/images/common/right_arrow_svg'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import DefaultOrganIcon from 'src/images/defaults/defaultOrganization_svg'
import ProductActions from 'src/redux/actions/commonActions/productActions'
import {userPostsSelector} from 'src/redux/selectors/common/post/userPostsSelector'
import PostActions from 'src/redux/actions/commonActions/postActions'
import PrivateRoute from '../../consts/PrivateRoute'

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
  profileBanner: fileType,
  profileMedia: fileType,
}

type StatesOrganization = {
  showSecondHeader: boolean,
}

class Organization extends PureComponent<PropsOrganization, StatesOrganization> {
  static propTypes = {
    userObject: PropTypes.object.isRequired,
    badgesObject: PropTypes.object.isRequired,
    badges: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    showSecondHeader: false,
  }

  firstGetBadges: boolean

  constructor(props: PropsOrganization) {
    super(props)
    this.firstGetBadges = true
  }

  componentDidUpdate(prevProps: PropsOrganization) {
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
    const {getUserByUserId, setParamUserId, getProducts, getPostByIdentity} = this.props.actions
    const userId: number = +params.id
    getPostByIdentity({postIdentity: userId, postOwnerId: userId})
    getUserByUserId(userId)
    setParamUserId({id: userId})
    getProducts({productOwnerId: userId})
    document.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._onScroll)
    const {removeParamUserId} = this.props.actions
    removeParamUserId()
  }

  _onScroll = () => {
    if (window.innerWidth <= 480) {
      if (window.scrollY > 350)
        this.setState({...this.state, showSecondHeader: true})
      else
        this.setState({...this.state, showSecondHeader: false})
    }
  }

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
    this.setState({...this.state, showSecondHeader: false})
  }


  render() {
    const {showSecondHeader} = this.state
    const {match, userObject, badges, translate, profileMedia, actions, posts} = this.props
    const {updatePost, deletePost} = actions
    const {path, url, params} = match
    const userId: number = +params.id
    const isLoading = userObject.id ? false : userObject.isLoading ? userObject.isLoading : true

    return (
        <div className="-userOrganBackgroundImg">

          {isLoading
              ? <UserSkeleton type='organization'/>
              :
              <React.Fragment>
                <div className={showSecondHeader ? 'top-bar-entity show' : 'top-bar-entity hide'}>
                  <RightArrowSvg onClick={this._goUp} className='back-button'/>
                  {!profileMedia
                      ? <img src={profileMedia.file} className='profile-top-bar' alt='profile'/>
                      : <DefaultOrganIcon className='profile-top-bar default-profile-organ'/>
                  }
                  <span className='organ-name'>
                  {userObject.nike_name || userObject.official_name || userObject.nike_name}
                  </span>
                </div>
                <div className={showSecondHeader ? '-main page-content has-two-header' : '-main page-content'}>
                  <SideBarContent
                      sideBarType={constants.USER_TYPES.ORG}
                      badges={badges}
                      paramId={userId}
                      owner={userObject}
                  />

                  <div className="col-md-6 col-sm-10 center-column">

                    <div className='header-container'>

                      <NavLink to={`${url}/Posts`} className='header-container-item'
                               activeClassName='header-container-item-active'>
                        <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                  content={translate['Stream']}/>
                      </NavLink>

                      {/*<NavLink to={`${url}/contributions`} className='header-container-item' activeClassName='header-container-item-active'>*/}
                      {/*<Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content={translate['Contributions']}/>*/}
                      {/*</NavLink>*/}

                      <NavLink to={`${url}/basicInformation`} className='header-container-item'
                               activeClassName='header-container-item-active'>
                        <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                  content={translate['About Us']}/>
                      </NavLink>

                      <NavLink to={`${url}/Followers`} className='header-container-item'
                               activeClassName='header-container-item-active'>
                        <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                  content={translate['Followers']}/>
                      </NavLink>

                      <NavLink to={`${url}/Followings`} className='header-container-item'
                               activeClassName='header-container-item-active'>
                        <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                  content={translate['Followings']}/>
                      </NavLink>

                      <NavLink to={`${url}/Exchanges`} className='header-container-item'
                               activeClassName='header-container-item-active'>
                        <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material'
                                  content={translate['Exchanges']}/>
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
                      {/*<PrivateRoute path={`${path}/contributions`}*/}
                      {/*component={Contributions}*/}
                      {/*ownerId={userId}*/}
                      {/*identityType={constants.USER_TYPES.ORG}*/}
                      {/*isUser={false}*/}
                      {/*/>*/}
                      <PrivateRoute exact={true}
                                    path={`${path}/Posts`}
                                    component={Posts}
                                    updatePost={updatePost}
                                    deletePost={deletePost}
                                    posts={posts}
                      />
                      <PrivateRoute exact path={`${path}/basicInformation`}
                                    component={OrganAboutUs}
                                    user={userObject}
                                    userId={userId}
                      />
                      <PrivateRoute path={`${path}/Followers`} component={Followers}
                                    ownerId={userId}
                                    identityType={constants.USER_TYPES.ORG}
                                    user={userObject}
                      />
                      <PrivateRoute path={`${path}/Followings`} component={Followings}
                                    ownerId={userId}
                                    identityType={constants.USER_TYPES.ORG}
                                    user={userObject}
                      />
                      <PrivateRoute path={`${path}/Exchanges`} component={Social}
                                    ownerId={userId}
                                    identityType={constants.USER_TYPES.ORG}
                                    user={userObject}
                      />
                      <PrivateRoute path={`${path}/Posts/:id`}
                                    component={PostExtendedView}
                                    extendedView={true}
                                    commentParentType={constants.COMMENT_PARENT.POST}
                                    ownerId={userId}
                      />
                      {/*<PrivateRoute path={`${path}/Customers`} component={Customers}*/}
                      {/*organizationId={userId}*/}
                      {/*/>*/}
                      {/*<PrivateRoute path={`${path}/Certificates`} component={Certificates}*/}
                      {/*ownerId={userId}*/}
                      {/*identityType={constants.USER_TYPES.ORG}*/}
                      {/*user={userObject}*/}
                      {/*/>*/}
                    </Switch>
                  </div>
                  <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
                    <ChatBar/>
                  </div>
                </div>
              </React.Fragment>
          }
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {params} = ownProps.match
  const userId = +params.id
  const defaultObject = {content: [], isLoading: true, error: null}
  const user = state.identities.list[userId] || defaultObject
  const profileBannerId = (user && user.profile_banner)
  const profileMediaId = (user && user.profile_media)
  const profileBanner = (profileBannerId && state.common.file.list[profileBannerId]) || {}
  const profileMedia = (profileMediaId && state.common.file.list[profileMediaId]) || {}
  const badgesObjectInUser = (user && user.badges) || defaultObject
  const allBadges = state.common.badges.badge.list
  const badges = badgesObjectInUser.content.map(badgeId => allBadges[badgeId])
  return {
    userObject: user,
    badgesObject: badgesObjectInUser,
    profileBanner,
    translate: getMessages(state),
    profileMedia,
    badges,
    posts: userPostsSelector(state, {id: userId}),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getProducts: ProductActions.getProductsByIdentity,
    getUserByUserId: GetUserActions.getUserByUserId,
    getUserBadges: BadgeActions.getUserBadges,
    setParamUserId: ParamActions.setParamUserId,
    removeParamUserId: ParamActions.removeParamUserId,
    getPostByIdentity: PostActions.getPostByIdentity,
    updatePost: PostActions.updatePost,
    deletePost: PostActions.deletePost,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Organization)