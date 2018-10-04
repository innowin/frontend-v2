// @flow
import * as React from 'react'
import {Component} from 'react'
import Exchanges from './Exchanges'
import Sidebar from './Sidebar'
import TopBar from '../../bars/TopBar'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges.js'
import constant from "../../../consts/constants"

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
      activeScrollHeight: number
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
    this.props.actions.getAllExchanges(24, this.state.offset)
    this.props.actions.getFollowers({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType, followOwnerId: this.props.currentUserId
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
      this.setState({
            ...this.state,
            activeScrollHeight: scrollHeight,
            scrollLoading: true,
            offset: this.state.offset + 24
          },
          () => this.props.actions.getAllExchanges(24, this.state.offset))
    }
  }

  render() {
    return (
        <div>
          <TopBar collapseClassName="col user-sidebar-width"/>
          <div style={{paddingTop: '55px'}}>
            <Sidebar getFollowersChecked={(checked) => {
              console.log(checked)
            }}/>
            <Exchanges exchanges={this.props.allExchanges}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allExchanges: getExchanges(state),
  currentUserType: state.auth.client.user_type,
  currentUserIdentity: state.auth.client.identity.content,
  currentUserId: state.auth.client.user.id,
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
    getFollowers: socialActions.getFollowers,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)

