// @flow
import * as React from 'react'
import {Component} from 'react'
import Exchanges from './Exchanges'
import Sidebar from './Sidebar'
import TopBar from '../../bars/TopBar'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges.js'
import {PostCreateForm} from "../../common/post/PostCreateForm"

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
      scrollLoading: false,
      justFollowing: false
    }
  }

  componentDidMount() {
    this.props.actions.getAllExchanges(24, this.state.offset)
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
          <Sidebar justFollowing={(checked) => this.setState({...this.state, justFollowing: checked})}/>
          <div className='all-exchanges-container'>
            <Exchanges exchanges={this.props.allExchanges} justFollowing={this.state.justFollowing}/>
            {/*{this.state.scrollLoading && <ClipLoader/>}*/}
          </div>

          {/*remove this*/}
          {/*<div>*/}
          {/*<PostCreateForm />*/}
          {/*</div>*/}
          {/*end*/}

        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allExchanges: getExchanges(state),
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)

