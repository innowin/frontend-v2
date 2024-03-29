import React from 'react'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import Exchanges from './Exchanges'
import RightArrowSvg from 'src/images/common/right_arrow_svg'
import Sidebar from './Sidebar'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges.js'
import {PureComponent} from 'react'
import MobileHeader from '../../user/explore/MobileHeader'
import {getHashTags} from 'src/redux/actions/commonActions/hashTagActions'
import {hashTagsListSelector} from 'src/redux/selectors/common/hashTags/hashTag'

class Explore extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeScrollHeight: 0,
      scrollLoading: false,
      justFollowing: false,
      search: null,
      tags: null,
      scrollButton: false,
      followed: [],
    }
  }

  componentDidMount() {
    this.props.actions.getAllExchanges(24, 0, null, null)
    this.props.actions.getHashTags()
    const {clientExchangeMemberships, exchangeMemberships} = this.props
    if (clientExchangeMemberships.length > 0) {
      const followed = clientExchangeMemberships.reduce((sum, exId) =>
          exchangeMemberships[exId] && {...sum, [exchangeMemberships[exId].exchange_identity_related_exchange.id]: exchangeMemberships[exId].id}, {},
      )
      this.setState({...this.state, followed: {...followed}})
    }
    document.addEventListener('scroll', this._onScroll)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {clientExchangeMemberships, exchangeMemberships} = nextProps
    if (clientExchangeMemberships.length > 0) {
      const followed = clientExchangeMemberships.reduce((sum, exId) =>
          exchangeMemberships[exId] && {...sum, [exchangeMemberships[exId].exchange_identity_related_exchange.id]: exchangeMemberships[exId].id}, {},
      )
      this.setState({...this.state, followed: {...followed}})
    }
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
            () => this.props.actions.getAllExchanges(24, Object.values(allExchanges).length, this.state.search, this.state.tags))
      }
      if (window.scrollY > 1000)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
  }

  _search = search => {
    this.setState({...this.state, search: search, activeScrollHeight: 0}, () => {
      this.props.actions.getAllExchanges(24, 0, search, this.state.tags)
    })
  }

  _searchByTags = tags => {
    this.setState({...this.state, tags, activeScrollHeight: 0}, () => {
      this.props.actions.getAllExchanges(24, 0, this.state.search, [...tags])
    })
  }

  _justFollowing = (checked) => this.setState({...this.state, justFollowing: checked})

  _goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const {allExchanges, loading, HashTags} = this.props
    const {justFollowing, scrollButton, followed, tags} = this.state

    return (
        <div className='all-exchanges-parent'>
          <MobileHeader search={this._search} path='/exchange/Exchange_Explorer/search'/>
          <Sidebar HashTags={HashTags} tags={tags} searchByTags={this._searchByTags} search={this._search} justFollowing={this._justFollowing}/>
          <div className='all-exchanges-container'>
            <Exchanges exchanges={allExchanges} justFollowing={justFollowing} loading={loading} followed={followed}/>
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
  clientExchangeMemberships: state.auth.client.exchangeMemberships,
  exchangeMemberships: state.common.exchangeMembership.list,
  HashTags: hashTagsListSelector(state),
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
    getHashTags,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)

