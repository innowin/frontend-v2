// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import Exchanges from './Exchanges'
import RightArrowSvg from 'src/images/common/right_arrow_svg'
import Sidebar from './Sidebar'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges.js'
import {PureComponent} from 'react'

type appProps =
    {|
      actions: { getAllExchanges: Function },
      currentUserIdentity: number,
      currentUserType: string,
      currentUserId: number,
      allExchanges: any,
      translate: Object,
      loading: boolean
    |}

type appState =
    {|
      activeScrollHeight: number,
      scrollLoading: boolean,
      justFollowing: boolean,
      search: ?string,
      scrollButton: boolean
    |}

class Explore extends PureComponent <appProps, appState> {
  constructor(props) {
    super(props)
    this.state = {
      activeScrollHeight: 0,
      scrollLoading: false,
      justFollowing: false,
      search: null,
      scrollButton: false,
    }
  }

  componentDidMount() {
    this.props.actions.getAllExchanges(250, 0, null)
    document.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll = () => {
    if (Object.values(this.props.allExchanges).length > 0) {
      let {activeScrollHeight} = this.state
      let {allExchanges} = this.props
      let scrollHeight = document.body ? document.body.scrollHeight : 0
      if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
        this.setState({...this.state, activeScrollHeight: scrollHeight, scrollLoading: true},
            () => this.props.actions.getAllExchanges(24, Object.values(allExchanges).length, this.state.search))
      }
      if (window.scrollY > 1000)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
  }


  _search = (search) =>
      this.setState({...this.state, search: search, activeScrollHeight: 0}, () => {
        this.props.actions.getAllExchanges(24, 0, search)
      })

  _justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const {allExchanges, loading} = this.props
    const {justFollowing, scrollButton} = this.state

    return (
        <div className='all-exchanges-parent'>
          <Sidebar search={this._search} justFollowing={this._justFollowing}/>
          <div className='all-exchanges-container'>
            <Exchanges exchanges={allExchanges} justFollowing={justFollowing} loading={loading}/>
            <div className='exchange-model-hide'/>
            <div className='exchange-model-hide'/>
            <div className='exchange-model-hide'/>
            <div className={loading ? 'exchanges-explore-search-loading' : 'exchanges-explore-search-loading-hide'}><ClipLoader/></div>
          </div>
          <div className={scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'} onClick={this._goUp}>
            <RightArrowSvg className='go-up-logo'/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allExchanges: getExchanges(state),
  loading: state.exchanges.isLoading,
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)

