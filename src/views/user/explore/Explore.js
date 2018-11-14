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
      search: null
    }
  }

  componentDidMount() {
    this.props.actions.getUsers(24, this.state.offset, null)
    this.props.actions.getFollowees({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId
    })
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    let {activeScrollHeight} = this.state
    let scrollHeight = document.body.scrollHeight
    console.log('scroll: ', window.innerHeight + window.scrollY)
    if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
      this.setState({
            ...this.state,
            activeScrollHeight: scrollHeight,
            offset: this.state.offset + 24
          },
          () => this.props.actions.getUsers(24, this.state.offset, this.state.search))
    }
  }

  search = (search) => {
    this.setState({...this.state, search: search, offset: 0, activeScrollHeight: 0}, () => {
      this.props.actions.getUsers(24, 0, search)
    })
  }

  render() {
    let followees = this.props.followees
    Object.values(this.props.followees).forEach(follow => {
          if (follow.follow_followed.id === this.props.currentUserIdentity) {
            delete followees[follow.id]
          }
          else {
            followees[follow.follow_followed.identity_user] = follow
            delete followees[follow.follow_followed.id]
          }
        }
    )
    return (
        <div className='all-exchanges-parent'>
          <TopBar collapseClassName="col user-sidebar-width"/>
          <Sidebar search={this.search}/>
          <div className='all-exchanges-container'>
            <Users followees={followees} users={this.props.allUsers} loading={this.props.loading}/>
            <div className='users-explore-hide'/>
            <div className='users-explore-hide'/>
            {
              <div style={{width: '100%', textAlign: 'center', transitionDuration: '0.3s', overflowY: 'hidden', height: this.props.loading ? '40px' : '0px', opacity: this.props.loading ? '1' : '0'}}><ClipLoader/></div>
            }
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
    followees: state.common.social.follows.list,
    loading: state.users.loading
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowees: socialActions.getFollowees,
    getUsers: userActions.getAllUsers
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)
