// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import Exchanges from './Exchanges'
import RightArrowSvg from '../../../images/common/right_arrow_svg'
import Sidebar from './Sidebar'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges.js'
import {getMessages} from '../../../redux/selectors/translateSelector'
import {PureComponent} from 'react'
// import {Helmet} from 'react-helmet'

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
      offset: number,
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
      offset: 0,
      activeScrollHeight: 0,
      scrollLoading: false,
      justFollowing: false,
      search: null,
      scrollButton: false
    }
  }

  componentDidMount() {
    this.props.actions.getAllExchanges(250, 0, null)
    window.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll = () => {
    if (Object.values(this.props.allExchanges).length > 0) {
      let {activeScrollHeight} = this.state
      let scrollHeight = document.body ? document.body.scrollHeight : 0
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
  }


  _search = (search) =>
      this.setState({...this.state, search: search, offset: 0, activeScrollHeight: 0}, () => {
        this.props.actions.getAllExchanges(24, 0, search)
      })

  _justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    const {translate, allExchanges, loading} = this.props
    const {justFollowing, scrollButton} = this.state
    // const title = `${translate['InnoWin']} - ${translate['Exchanges']}`
    // const description = `${translate['Exchanges']}`

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
  translate: getMessages(state),
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)

