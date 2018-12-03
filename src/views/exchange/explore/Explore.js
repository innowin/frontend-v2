// @flow
import * as React from 'react'
import {PureComponent} from 'react'
import Exchanges from './Exchanges'
import Sidebar from './Sidebar'
import TopBar from '../../bars/TopBar'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges.js'
import {ClipLoader} from "react-spinners"
import RightArrowSvg from "../../../images/common/right_arrow_svg"

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

class Explore extends PureComponent <appProps, appState> {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      activeScrollHeight: 0,
      scrollLoading: false,
      justFollowing: false,
      search: null,
      scrollButton: false
    }
  }

  componentDidMount() {
    this.props.actions.getAllExchanges(24, 0, null)
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
            scrollLoading: true,
            offset: this.state.offset + 24
          },
          () => this.props.actions.getAllExchanges(24, this.state.offset, this.state.search))
    }

    if (window.scrollY > 1000)
      this.setState({...this.state, scrollButton: true})
    else this.setState({...this.state, scrollButton: false})

  }

  search = (search) =>
      this.setState({...this.state, search: search, offset: 0, activeScrollHeight: 0}, () => {
        this.props.actions.getAllExchanges(24, 0, search)
      })

  justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    return (
        <div className='all-exchanges-parent'>
          <TopBar collapseClassName="col user-sidebar-width"/>
          <Sidebar search={this.search} justFollowing={this.justFollowing}/>
          <div className='all-exchanges-container'>
            <Exchanges exchanges={this.props.allExchanges} justFollowing={this.state.justFollowing} loading={this.props.loading}/>
            <div className='exchange-model-hide'/>
            <div className='exchange-model-hide'/>
            <div className={this.props.loading ? 'exchanges-explore-search-loading' : 'exchanges-explore-search-loading-hide'}><ClipLoader/></div>
          </div>
          <div className={this.state.scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'} onClick={this.goUp}>
            <RightArrowSvg className='go-up-logo'/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allExchanges: getExchanges(state),
  loading: state.exchanges.loading
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)

