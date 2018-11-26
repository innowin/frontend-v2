// @flow
import * as React from 'react'
import {Component} from 'react'
import Users from './Users'
import Sidebar from './SideBar'
import TopBar from '../../bars/TopBar'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import userActions from 'src/redux/actions/user/getUserActions'
import {getUsers} from 'src/redux/selectors/user/GetAllUsers'
import {ClipLoader} from "react-spinners"
import {getFollowList} from 'src/redux/selectors/common/social/getFollowList'

type appProps =
    {|
      actions: any,
      currentUserIdentity: number,
      currentUserType: string,
      currentUserId: number,
    |}

type appState =
    {|
      offset: number,
      activeScrollHeight: number,
      scrollLoading: boolean
    |}

class Explore extends Component <appProps, appState> {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      activeScrollHeight: 0,
      search: null,
      justFollowing: false,
      justFollowed: false
    }
  }

  componentDidMount() {
    this.props.actions.getUsers(24, 0, null)
    this.props.actions.getFollowees({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId,
      notProfile: true
    })
    this.props.actions.getFollowers({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId,
      notProfile: true
    })
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    let {activeScrollHeight} = this.state
    let scrollHeight = document.body.scrollHeight
    if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
      this.setState({
            ...this.state,
            activeScrollHeight: scrollHeight,
            offset: this.state.offset + 24
          },
          () => this.props.actions.getUsers(24, this.state.offset, this.state.search))
    }
  }

  search = (search) =>
      this.setState({...this.state, search: search, offset: 0, activeScrollHeight: 0}, () => {
        this.props.actions.getUsers(24, 0, search)
      })

  justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  justFollowed = (checked) => this.setState({...this.state, justFollowed: checked})

  render() {
    const list = this.props.followees
    let followees = {}
    let followers = {}

    Object.values(list).forEach(follow => {
          if (follow.follow_followed.id === this.props.currentUserIdentity) {
            followers[follow.follow_follower.identity_user] = follow
          }
          else {
            followees[follow.follow_followed.identity_user] = follow
          }
        }
    )

    return (
        <div className='all-exchanges-parent'>
          <TopBar collapseClassName="col user-sidebar-width"/>
          <Sidebar search={this.search} justFollowing={this.justFollowing} justFollowed={this.justFollowed}/>
          <div className='all-exchanges-container'>
            <Users followees={followees} followers={followers} users={this.props.allUsers} justFollowing={this.state.justFollowing} justFollowed={this.state.justFollowed}
                   loading={this.props.loading}/>
            <div className='users-explore-hide'/>
            <div className='users-explore-hide'/>
            <div className={this.props.loading ? 'exchanges-explore-search-loading' : 'exchanges-explore-search-loading-hide'}><ClipLoader/></div>
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
    loading: state.users.loading
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
