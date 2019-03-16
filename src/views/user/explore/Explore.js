// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import RightArrowSvg from 'src/images/common/right_arrow_svg'
import Sidebar from './SideBar'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import userActions from 'src/redux/actions/user/getUserActions'
import Users from './Users'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getFollowList} from 'src/redux/selectors/common/social/getFollowList'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getUsers} from 'src/redux/selectors/user/GetAllUsers'
import {PureComponent} from 'react'

type appProps =
    {|
      actions: any,
      currentUser: Object,
      translate: Object,
      loading: boolean,
      allUsers: Object,
      followees: Object
    |}

type appState =
    {|
      activeScrollHeight: number,
      search: ?string,
      justFollowing: boolean,
      justFollowed: boolean,
      scrollButton: boolean,
      justUsers: boolean,
      justOrgans: boolean,
    |}

class Explore extends PureComponent <appProps, appState> {
  constructor(props) {
    super(props)
    this.state = {
      activeScrollHeight: 0,
      search: null,
      justFollowing: false,
      justFollowed: false,
      scrollButton: false,
      justUsers: false,
      justOrgans: false,
    }
  }

  componentDidMount() {
    const {currentUser, actions} = this.props
    actions.getUsers(24, 0, null, null)
    actions.getFollowees({followOwnerIdentity: currentUser.id, followOwnerType: currentUser.identity_type, followOwnerId: currentUser.id, notProfile: true})
    actions.getFollowers({followOwnerIdentity: currentUser.id, followOwnerType: currentUser.identity_type, followOwnerId: currentUser.id, notProfile: true})
    window.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll = () => {
    if (Object.values(this.props.allUsers).length > 0) {
      let {activeScrollHeight} = this.state
      let {allUsers} = this.props
      let scrollHeight = document.body ? document.body.scrollHeight : 0
      if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
        this.setState({...this.state, activeScrollHeight: scrollHeight},
            () => this.props.actions.getUsers(24, Object.values(allUsers).length, this.state.search,
                this.state.justOrgans && !this.state.justUsers ? true : !this.state.justOrgans && this.state.justUsers ? false : null))
      }

      if (window.scrollY > 1000)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
  }

  _search = (search) =>
      this.setState({...this.state, search: search, activeScrollHeight: 0}, () => {
        this.props.actions.getUsers(24, 0, search, this.state.justOrgans && !this.state.justUsers ? true : !this.state.justOrgans && this.state.justUsers ? false : null)
      })

  _justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  _justFollowed = (checked) => this.setState({...this.state, justFollowed: checked})

  _justUsers = (checked) => this.setState({...this.state, justUsers: checked}, () => {
    if (!this.state.justOrgans && checked) {
      this.props.actions.getUsers(24, 0, this.state.search, false)
    }
  })

  _justOrgans = (checked) => this.setState({...this.state, justOrgans: checked}, () => {
    if (!this.state.justUsers && checked) {
      this.props.actions.getUsers(24, 0, this.state.search, true)
    }
  })

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const {loading, allUsers} = this.props
    const {justFollowing, justFollowed, scrollButton, justOrgans, justUsers} = this.state
    const list = this.props.followees
    let followees = {}
    let followers = {}

    Object.values(list).forEach((follow: Object) => {
          if (follow.follow_followed.id === this.props.currentUser.id) {
            followers[follow.follow_follower.identity_user] = follow
          }
          else {
            followees[follow.follow_followed.identity_user] = follow
          }
        },
    )

    return (
        <div className='all-exchanges-parent'>
          <Sidebar search={this._search}
                   justFollowing={this._justFollowing}
                   justFollowed={this._justFollowed}
                   justUsers={this._justUsers}
                   justOrgans={this._justOrgans}
          />
          <div className='all-exchanges-container'>
            <Users followees={followees}
                   followers={followers}
                   users={allUsers}
                   justFollowing={justFollowing}
                   justFollowed={justFollowed}
                   justOrgans={justOrgans}
                   justUsers={justUsers}
                   loading={loading}
            />
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
  const id = state.auth.client.identity.content
  const currentUser = state.identities.list[id]

  return {
    currentUser,
    allUsers: getUsers(state),
    followees: getFollowList(state),
    loading: state.identities.isLoading,
    translate: getMessages(state),
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: socialActions.getFollowees,
    getFollowers: socialActions.getFollowers,
    getUsers: userActions.getAllUsers,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)