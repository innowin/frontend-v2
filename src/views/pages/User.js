// @flow
import * as React from 'react'
import BadgeActions from 'src/redux/actions/commonActions/badgeActions'
import Certificates from '../common/certificates/index'
import constants from 'src/consts/constants'
import GetUserActions from 'src/redux/actions/user/getUserActions'
import Material from '../common/components/Material'
import ParamActions from 'src/redux/actions/paramActions'
import ExtendedPostView from 'src/views/common/post/ExtendedPostView'
import Posts from 'src/views/common/post/index'
import * as PropTypes from 'prop-types'
import Exchanges from 'src/views/common/social/exchanges/index'
import Following from 'src/views/common/social/following/index'
import Follower from 'src/views/common/social/follower/index'
import type {badgeType} from 'src/consts/flowTypes/common/badges'
import type {userStateObject, listOfIdObject} from 'src/consts/flowTypes/stateObjectType'
import UserAboutMe from '../user/aboutMe'
import UserSkeleton from '../user/skeleton/UserSkeleton'
import {bindActionCreators} from 'redux'
import {Component} from 'react'
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {NavLink, Switch, Redirect} from 'react-router-dom'
import SideBarContent from '../user/SideBar'
import ProductActions from 'src/redux/actions/commonActions/productActions'
import PostActions from 'src/redux/actions/commonActions/postActions'
import {userPostsSelector} from 'src/redux/selectors/common/post/userPostsSelector'
import PrivateRoute from '../../consts/PrivateRoute'
import {DefaultUserIcon, NewRightArrow} from '../../images/icons'
import PropsRoute from '../../consts/PropsRoute'
import {getClientIdentity} from '../../redux/selectors/common/client/getClient'

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
  userObject: userStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
  translate: { [string]: string }
}

type StatesUser = {
  showSecondHeader: boolean,
}

class User extends Component<PropsUser, StatesUser> {

  static propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    showSecondHeader: false,
  }

  firstGetBadges: boolean

  constructor(props) {
    super(props)
    this.firstGetBadges = true
  }

  componentDidMount() {
    const {params} = this.props.match
    const userId = +params.id
    const {getUserByUserId, setParamUserId, getProducts, getUserBadges} = this.props.actions
    getUserByUserId(userId)
    setParamUserId({id: userId})
    getProducts({productOwnerId: userId})
    getUserBadges(userId, userId)
    document.addEventListener('scroll', this._onScroll)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      const {params} = nextProps.match
      const {getUserByUserId, setParamUserId, getProducts, getUserBadges} = nextProps.actions
      const userId = +params.id
      getUserByUserId(userId)
      setParamUserId({id: userId})
      getProducts({productOwnerId: userId})
      getUserBadges(userId, userId)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._onScroll)
    const {removeParamUserId} = this.props.actions
    removeParamUserId()
  }

  _onScroll = () => {
    if (window.innerWidth <= 480) {
      if (window.scrollY > 350) this.setState({...this.state, showSecondHeader: true})
      else this.setState({...this.state, showSecondHeader: false})
    }
  }

  _goBack = () => {
    window.history.back()
  }

  render() {
    const {showSecondHeader} = this.state
    const {match, userObject, badges, translate, actions, posts, isLogin} = this.props
    const {updatePost, deletePost, getPostByIdentity} = actions
    const {path, url, params} = match
    const userId: number = +params.id
    const isLoading = userObject.id ? false : userObject.isLoading ? userObject.isLoading : true

    return (
        <div className="-userOrganBackgroundImg">
          {
            isLoading ?
                <UserSkeleton type='user'/>
                :
                <React.Fragment>
                  <div className={showSecondHeader ? 'top-bar-entity' : 'top-bar-entity show'}>
                    <Material backgroundColor='rgba(255,255,255,0.5)' onClick={this._goBack} className='back-button-material' content={<NewRightArrow className='back-button-product'/>}/>
                    {
                      userObject.profile_media ?
                          <img src={userObject.profile_media.file} className='profile-top-bar' alt='profile'/>
                          :
                          <DefaultUserIcon className='profile-top-bar default-profile-organ'/>
                    }
                    <span className='organ-name'>{(userObject.first_name + ' ' + userObject.last_name) || userObject.username}</span>
                  </div>
                  <div className={showSecondHeader ? '-main page-content has-two-header' : '-main page-content'}>
                    <SideBarContent
                        sideBarType={constants.USER_TYPES.USER}
                        paramId={userId}
                        owner={userObject}
                    />

                    <div className="col-md-6 col-sm-10 center-column">

                      <div className='header-container'>
                        <NavLink to={`${url}/Posts`} className='header-container-item' activeClassName='header-container-item-active'>
                          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content={translate['Stream']}/>
                        </NavLink>

                        <NavLink to={`${url}/basicInformation`} className='header-container-item' activeClassName='header-container-item-active'>
                          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['About Me']}/>
                        </NavLink>

                        <NavLink to={`${url}/Exchanges`} className='header-container-item' activeClassName='header-container-item-active'>
                          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Exchanges']}/>
                        </NavLink>

                        <NavLink to={`${url}/Followings`} className='header-container-item' activeClassName='header-container-item-active'>
                          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Followings']}/>
                        </NavLink>

                        <NavLink to={`${url}/Followers`} className='header-container-item' activeClassName='header-container-item-active'>
                          <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Followers']}/>
                        </NavLink>
                      </div>

                      <Switch>
                        <Redirect exact from={`${url}/`} to={`${url}/Posts`}/>

                        <PropsRoute exact={true}
                                    path={`${path}/Posts`}
                                    component={Posts}
                                    updatePost={updatePost}
                                    deletePost={deletePost}
                                    posts={posts}
                                    userId={userId}
                                    getPostByIdentity={getPostByIdentity}
                                    isLogin={isLogin}
                        />
                        <PropsRoute path={`${path}/basicInformation`}
                                    component={UserAboutMe}
                                    userId={userId}
                                    user={userObject}
                                    badges={badges}
                        />
                        <PrivateRoute path={`${path}/Exchanges`}
                                      component={Exchanges}
                                      ownerId={userId}
                                      identityType={constants.USER_TYPES.USER}
                                      user={userObject}
                        />
                        <PrivateRoute path={`${path}/Followings`}
                                      component={Following}
                                      ownerId={userId}
                                      identityType={constants.USER_TYPES.USER}
                                      user={userObject}
                        />
                        <PrivateRoute path={`${path}/Followers`}
                                      component={Follower}
                                      ownerId={userId}
                                      identityType={constants.USER_TYPES.USER}
                                      user={userObject}
                        />
                        <PrivateRoute path={`${path}/Certificates`}
                                      component={Certificates}
                                      ownerId={userId}
                                      identityType={constants.USER_TYPES.USER}
                                      user={userObject}
                        />
                        <PropsRoute path={`${path}/Posts/:id`} component={ExtendedPostView}/>

                      </Switch>
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
  const badgesObjectInUser = (user && user.badges) || defaultObject
  const allBadges = state.common.badges.badge.list
  const badges = badgesObjectInUser.content.map(badgeId => allBadges[badgeId])
  return {
    isLogin: getClientIdentity(state),
    userObject: user,
    translate: getMessages(state),
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
export default connect(mapStateToProps, mapDispatchToProps)(User)
