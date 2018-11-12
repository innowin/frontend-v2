// @flow
import * as React from 'react'
import {Component} from 'react'
import Users from './Users'
import Sidebar from './SideBar'
import TopBar from '../../bars/TopBar'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import userActions from 'src/redux/actions/user/getUserActions'
import {getUsers} from 'src/redux/selectors/user/GetAllUsers'

type appProps =
    {|
      actions: any,
      currentUserIdentity: number,
      currentUserType: string,
      currentUserId: number,
      allExchanges: Array<any>
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
      scrollLoading: false
    }
  }

  componentDidMount() {
    this.props.actions.getUsers(24, this.state.offset)
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
    if (((window.innerHeight + window.scrollY) >= (scrollHeight - 500)) && (scrollHeight > activeScrollHeight)) {
      // this.setState({
      //       ...this.state,
      //       activeScrollHeight: scrollHeight,
      //       scrollLoading: true,
      //       offset: this.state.offset + 24
      //     },
      // () => this.props.actions.getAllExchanges(24, this.state.offset))
    }
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
        <div>
          <TopBar collapseClassName="col user-sidebar-width"/>
          <div style={{paddingTop: '55px'}}>
            <Sidebar/>
            <Users followees={followees} users={this.props.allUsers}/>
            {/*{this.state.scrollLoading && <ClipLoader/>}*/}
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
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
    getFollowees: socialActions.getFollowees,
    getUsers: userActions.getAllUsers
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)
