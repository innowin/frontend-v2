import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import RightArrowSvg from 'src/images/common/right_arrow_svg'
import Sidebar from './SideBar'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import userActions from 'src/redux/actions/user/getUserActions'
import Users from './Users'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getUsers} from 'src/redux/selectors/user/GetAllUsers'
import {PureComponent} from 'react'
import {getFollowersSelector} from 'src/redux/selectors/common/social/getFollowers'
import {getFolloweesSelector} from 'src/redux/selectors/common/social/getFollowees'
import MobileHeader from './MobileHeader'
import {getClientIdentity} from '../../../redux/selectors/common/client/getClient'

class Explore extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeScrollHeight: 0,
      offset: 24,
      search: null,
      justFollowing: false,
      justFollowed: false,
      scrollButton: false,
      justUsers: false,
      justOrgans: false,
      workStatus: null,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const {currentUser, actions} = this.props
      actions.getUsers(24, 0, null, null, null, !currentUser)
      if (currentUser) {
        actions.getFollowees({followOwnerIdentity: currentUser, followOwnerId: currentUser, notProfile: true})
        actions.getFollowers({followOwnerIdentity: currentUser, followOwnerId: currentUser, notProfile: true})
      }
    }, 500)
    document.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll = () => {
    const {offset} = this.state
    if (Object.values(this.props.allUsers).length > 0) {
      let {activeScrollHeight} = this.state
      let scrollHeight = document.body ? document.body.scrollHeight : 0
      if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
        this.setState({...this.state, activeScrollHeight: scrollHeight, offset: offset + 24},
            () => this.props.actions.getUsers(
                24,
                offset,
                this.state.search,
                this.state.justOrgans && !this.state.justUsers ? true : !this.state.justOrgans && this.state.justUsers ? false : null,
                this.state.workStatus,
                !this.props.currentUser,
            ),
        )
      }

      if (window.scrollY > 1000)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
  }

  _search = (search) => {
    this.setState({...this.state, search, activeScrollHeight: 0}, () => {
      this.props.actions.getUsers(
          24,
          0,
          search,
          this.state.justOrgans && !this.state.justUsers ? true : !this.state.justOrgans && this.state.justUsers ? false : null,
          this.state.workStatus,
          !this.props.currentUser,
      )
    })
  }

  _justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  _justFollowed = (checked) => this.setState({...this.state, justFollowed: checked})

  _justUsers = (checked) => {
    this.setState({...this.state, justUsers: checked, activeScrollHeight: 0}, () => {
      if (!this.state.justOrgans && checked) {
        this.props.actions.getUsers(
            24,
            0,
            this.state.search,
            false,
            this.state.workStatus,
            !this.props.currentUser,
        )
      }
    })
  }

  _justOrgans = (checked) => {
    this.setState({...this.state, justOrgans: checked, activeScrollHeight: 0}, () => {
      if (!this.state.justUsers && checked) {
        this.props.actions.getUsers(
            24,
            0,
            this.state.search,
            true,
            this.state.workStatus,
            !this.props.currentUser,
        )
      }
    })
  }

  _searchWorkStatus = (workStatus) => {
    this.setState({...this.state, workStatus, activeScrollHeight: 0}, () => {
      this.props.actions.getUsers(
          24,
          0,
          this.state.search,
          this.state.justOrgans && !this.state.justUsers ? true : !this.state.justOrgans && this.state.justUsers ? false : null,
          workStatus,
          !this.props.currentUser,
      )
    })
  }

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const {loading, allUsers, currentUser, translate, followees, followers, path} = this.props
    const {justFollowing, justFollowed, scrollButton, justOrgans, justUsers, workStatus} = this.state

    const followeesArr = Object.values(followees).reduce((all, follow) => {
      const id = follow.follow_followed.id ? follow.follow_followed.id : follow.follow_followed
      return {...all, [id]: follow}
    }, {})

    const followersArr = Object.values(followers).reduce((all, follow) => {
      const id = follow.follow_follower.id ? follow.follow_follower.id : follow.follow_follower
      return {...all, [id]: follow}
    }, {})

    return (
        <div className='all-exchanges-parent'>

          <MobileHeader search={this._search} path='/users/user_explorer/search'/>

          <Sidebar search={this._search}
                   justFollowing={this._justFollowing}
                   justFollowed={this._justFollowed}
                   justUsers={this._justUsers}
                   justOrgans={this._justOrgans}
                   searchWorkStatus={this._searchWorkStatus}
                   path={path}
          />
          <div className='all-exchanges-container'>
            <Users followees={followeesArr}
                   followers={followersArr}
                   users={allUsers}
                   justFollowing={justFollowing}
                   justFollowed={justFollowed}
                   justOrgans={justOrgans}
                   justUsers={justUsers}
                   workStatus={workStatus}
                   loading={loading}
                   translate={translate}
                   currentUser={currentUser}
            />
            <div className='users-explore-hide'/>
            <div className='users-explore-hide'/>
            <div className='users-explore-hide'/>
            <div className={loading ? 'exchanges-explore-search-loading' : 'exchanges-explore-search-loading exchanges-explore-search-loading-hide'}><ClipLoader/></div>
          </div>
          <div className={scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'} onClick={this._goUp}>
            <RightArrowSvg className='go-up-logo'/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const id = getClientIdentity(state)

  return {
    currentUser: id,
    allUsers: getUsers(state),
    followers: getFollowersSelector(state, {ownerId: id}),
    followees: getFolloweesSelector(state, {ownerId: id}),
    loading: state.identities.isLoading,
    translate: getMessages(state),
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUsers: userActions.getAllUsers,
    getFollowees: socialActions.getFollowees,
    getFollowers: socialActions.getFollowers,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)