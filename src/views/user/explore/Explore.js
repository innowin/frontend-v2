// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import RightArrowSvg from '../../../images/common/right_arrow_svg'
import Sidebar from './SideBar'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import userActions from 'src/redux/actions/user/getUserActions'
import Users from './Users'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getFollowList} from 'src/redux/selectors/common/social/getFollowList'
import {getMessages} from '../../../redux/selectors/translateSelector'
import {getUsers} from 'src/redux/selectors/user/GetAllUsers'
// import {Helmet} from 'react-helmet'
import {PureComponent} from 'react'

type appProps =
    {|
      actions: any,
      currentUserIdentity: number,
      currentUserType: string,
      currentUserId: number,
      translate: Object,
      loading: boolean,
      allUsers: Object,
      followees: Object
    |}

type appState =
    {|
      offset: number,
      activeScrollHeight: number,
      search: ?string,
      justFollowing: boolean,
      justFollowed: boolean,
      scrollButton: boolean,
    |}

class Explore extends PureComponent <appProps, appState> {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      activeScrollHeight: 0,
      search: null,
      justFollowing: false,
      justFollowed: false,
      scrollButton: false
    }
  }

  componentDidMount() {
    const {currentUserIdentity, currentUserType, currentUserId, actions} = this.props
    actions.getUsers(24, 0, null)
    actions.getFollowees({followOwnerIdentity: currentUserIdentity, followOwnerType: currentUserType, followOwnerId: currentUserId, notProfile: true})
    actions.getFollowers({followOwnerIdentity: currentUserIdentity, followOwnerType: currentUserType, followOwnerId: currentUserId, notProfile: true})
    window.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll = () => {
    let {activeScrollHeight} = this.state
    let scrollHeight = document.body ? document.body.scrollHeight : 0
    if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
      this.setState({
            ...this.state,
            activeScrollHeight: scrollHeight,
            offset: this.state.offset + 24
          },
          () => this.props.actions.getUsers(24, this.state.offset, this.state.search))
    }

    if (window.scrollY > 1000)
      this.setState({...this.state, scrollButton: true})
    else this.setState({...this.state, scrollButton: false})

  }

  _search = (search) =>
      this.setState({...this.state, search: search, offset: 0, activeScrollHeight: 0}, () => {
        this.props.actions.getUsers(24, 0, search)
      })

  _justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  _justFollowed = (checked) => this.setState({...this.state, justFollowed: checked})

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    const {translate, loading, allUsers} = this.props
    const {justFollowing, justFollowed, scrollButton} = this.state
    const list = this.props.followees
    let followees = {}
    let followers = {}
    // const title = `${translate['InnoWin']} - ${translate['Users']}`
    // const description = `${translate['Users']}`

    Object.values(list).forEach((follow: Object) => {
          if (follow.follow_followed.id === this.props.currentUserIdentity) {
            followers[follow.follow_follower.identity_user] = follow
          } else {
            followees[follow.follow_followed.identity_user] = follow
          }
        }
    )

    return (
        <div className='all-exchanges-parent'>

          {/*<Helmet>*/}
          {/*<title>{title}</title>*/}
          {/*<meta name="description" content={description}/>*/}
          {/*<meta property="og:title" content={title}/>*/}
          {/*<meta property="og:description" content={description}/>*/}
          {/*<meta property="twitter:title" content={title}/>*/}
          {/*<meta property="twitter:description" content={description}/>*/}
          {/*</Helmet>*/}

          <Sidebar search={this._search} justFollowing={this._justFollowing} justFollowed={this._justFollowed}/>
          <div className='all-exchanges-container'>
            <Users followees={followees} followers={followers} users={allUsers} justFollowing={justFollowing} justFollowed={justFollowed} loading={loading}/>
            <div className='users-explore-hide'/>
            <div className='users-explore-hide'/>
            <div className='users-explore-hide'/>
            <div className={loading ? 'exchanges-explore-search-loading' : 'exchanges-explore-search-loading-hide'}><ClipLoader/></div>
          </div>
          <div className={scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'} onClick={this._goUp}>
            <RightArrowSvg className='go-up-logo'/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const userId = state.auth.client.organization !== null ? state.auth.client.organization.id : state.auth.client.user.id
  return {
    currentUserType: state.auth.client.user_type,
    currentUserIdentity: state.auth.client.identity.content,
    currentUserId: userId,
    allUsers: getUsers(state),
    followees: getFollowList(state),
    loading: state.users.isLoading,
    translate: getMessages(state),
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: socialActions.getFollowees,
    getFollowers: socialActions.getFollowers,
    getUsers: userActions.getAllUsers
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)
