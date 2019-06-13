// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import ExchangeMembershipActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import type {exchangeType} from 'src/consts/flowTypes/exchange/exchange.js'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ChannelIcon, MainLbarArrow} from 'src/images/icons'
import {getExchangeMembershipsSelector} from 'src/redux/selectors/common/social/getExchangeMemberships'
import Material from '../../common/components/Material'
import UserDetailPanel from '../../common/components/UserDetailPanel'

type PropsSideBarItem = {
  exchange: exchangeType,
  handleClick: Function,
  active: boolean
}

export class SideBarItem extends Component<PropsSideBarItem> {

  static propTypes = {
    exchange: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
    }
  }

  componentDidMount() {
    if (this.props.exchange.exchange_image) {
      let image = new Image()
      image.src = this.props.exchange.exchange_image.file
      image.onload = () => {
        this.setState({...this.state, imageLoaded: true})
      }
    }
  }

  _onClickHandler = () => {
    const {handleClick, exchange} = this.props
    handleClick(exchange.id)
  }

  render() {
    const {active} = this.props
    const {exchange_image, name, id: exchangeId} = this.props.exchange
    return (
        <div className={`item-wrapper ${active ? 'active' : ''}`} onClick={this._onClickHandler}>
          <Material content={
            <div className="header-exchange">
              <a className="default-logo">
                {exchange_image && this.state.imageLoaded ?
                    <img className="img-logo" src={exchange_image.file} alt="logo"/>
                    :
                    <ChannelIcon className='default-channel-icon'/>
                }
              </a>
              <div className={`exchange-name ${active && 'active'}`}>{name}
                <Link to={active ? '/exchange/' + exchangeId : '/'}>
                  <div className={`exchange-sub-name-link ${active && 'active'}`}>پروفایل پنجره</div>
                </Link>
              </div>
              <div className={active ? 'left-arrow-home-exchange-container' : 'left-arrow-home-exchange-container-hide'}>
                <MainLbarArrow className="home-exchange-left-arrow"/>
              </div>
            </div>
          }/>
        </div>
    )
  }
}


type StateHomeSideBar = {|
  activeId: ?number,
|}

type PropsHomeSideBar = {|
  identityId: number,
  activeExchangeId: ?number,
  setExchangeId: Function,
  classNames?: string,
  clientExchanges: ({ id: number })[],
  isLoading: boolean,
  error: ?string,
  actions: {
    getExchangeMembershipByMemberIdentity: Function
  },
  identityType: string,
|}

class HomeSideBar extends Component<PropsHomeSideBar, StateHomeSideBar> {
  static propTypes = {
    identityId: PropTypes.number.isRequired,
    activeExchangeId: PropTypes.number,
    setExchangeId: PropTypes.func.isRequired,
    classNames: PropTypes.string,
    identityType: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {activeId: null}
  }

  componentDidMount() {
    const {identityId, identityType} = this.props
    const {getExchangeMembershipByMemberIdentity} = this.props.actions
    if (identityId && identityType)
      getExchangeMembershipByMemberIdentity({identityId, exchangeMembershipOwnerId: identityId})
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.activeExchangeId && window.innerWidth > 480 && nextProps.clientExchanges.length > 0) {
      const {setExchangeId, clientExchanges} = nextProps
      setExchangeId(clientExchanges[0].id)
    }
  }

  _handleClick = (id) => this.props.setExchangeId(id)

  render() {
    const {clientExchanges, classNames, activeExchangeId} = this.props
    return (
        <div className={classNames}>
          <UserDetailPanel/>
          <div className='home-sidebar-cont-title'>
            <div className='home-sidebar-cont-item'>پنجره ها</div>
            <Link to='/exchange/exchange_Explorer' className='home-sidebar-cont-item-more'>بیشتر</Link>
          </div>
          <div className='home-sidebar-cont'>
            {
              clientExchanges && clientExchanges.length > 0 ?
                  clientExchanges
                      .sort((a, b) => a.updated_time - b.updated_time)
                      .map((exchange, i) => {
                        return <SideBarItem key={i}
                                            exchange={exchange}
                                            handleClick={this._handleClick}
                                            active={exchange.id === activeExchangeId}/>
                      })
                  : <p className="mt-3 pr-3"><b>شما عضو هیچ پنجره ای نیستید!</b></p>
            }
          </div>
          <div className='exchanges-last'/>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  clientExchanges: getExchangeMembershipsSelector(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeSideBar)