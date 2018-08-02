// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import ExchangeActions from "src/redux/actions/exchangeActions"
import type {exchangeIdentityType, exchangeType} from "src/consts/flowTypes/exchange/exchange.js"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {SeeViewIcon, RefreshIcon, SettingIcon, DefaultExchangeIcon} from "src/images/icons"

const DescriptionSideBarItem = ({description = '', className = ""}) => {
  return (
    <div className={className}>
      {description}
    </div>
  )
}

const FooterSideBarItem = ({exchangeId, className = ""}) => {
  return (
    <div className={className}>
      <Link to={"/exchange/" + exchangeId}><SeeViewIcon height="15px" className="cursor-pointer"/></Link>
      <SettingIcon height="16px" className="cursor-pointer mr-4"/>
      <RefreshIcon height="16px" className="cursor-pointer mr-4"/>
    </div>
  )
}

type PropsSideBarItem = {
  exchange: exchangeType,
  handleClick: Function,
  active: boolean
}

export class SideBarItem extends Component<PropsSideBarItem> {

  static propTypes = {
    exchange: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    active: PropTypes.bool
  }

  _onClickHandler = () => {
    const {handleClick, exchange} = this.props
    handleClick(exchange.id)
  }

  render() {
    const {active} = this.props
    const {link: imageId, name, description, id: exchangeId} = this.props.exchange
    return (
      <div className={`item-wrapper ${ active ? 'active' : ''}`} onClick={this._onClickHandler}>
        <div className="header-exchange">
          {!imageId ? <DefaultExchangeIcon className="default-logo"/> :
            <img className="img-logo" src={imageId} alt="logo"/>
          }
          <div className="exchange-name">{name}</div>
        </div>
        {
          (!active) ? ('') : (
            <div className="active-content">
              <DescriptionSideBarItem description={description} className="active-description"/>
              <FooterSideBarItem exchangeId={exchangeId} className="active-footer"/>
            </div>
          )
        }
      </div>
    )
  }
}


type StateHomeSideBar = {|
  activeId: ?number
|}

type PropsHomeSideBar = {|
  identityId: number,
  setExchangeId: Function,
  classNames?: string,
  clientExchangeIdentities: {
    content: (exchangeIdentityType)[],
    isLoading: boolean,
    isLoaded: boolean
  },
  actions: {
    getExchangeIdentities: Function
  }
|}

class HomeSideBar extends Component<PropsHomeSideBar, StateHomeSideBar> {
  static propTypes = {
    identityId: PropTypes.number.isRequired,
    setExchangeId: PropTypes.func.isRequired,
    classNames: PropTypes.string,
    clientExchangeIdentities: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {activeId: null}
  }

  _handleClick = (id) => {
    const {setExchangeId} = this.props
    this.setState({...this.state, activeId: id}, () => setExchangeId(id))
  }

  componentDidMount() {
    const {identityId, clientExchangeIdentities} = this.props
    const {getExchangeIdentities} = this.props.actions
    if (clientExchangeIdentities && !clientExchangeIdentities.isLoaded) {
      getExchangeIdentities(identityId)
    }
  }

  render() {
    const {clientExchangeIdentities, classNames} = this.props
    const exchanges = (clientExchangeIdentities) ? (clientExchangeIdentities.content) : null
    return (
      <div className={classNames}>
        {
          (exchanges && exchanges.length > 0) ? (
            exchanges.map((item, i) => {
              const exchange = item.exchange_identity_related_exchange
              const {activeId} = this.state
              return (
                (exchange.id === activeId) ?
                  <SideBarItem key={i + "HomeSideBar-active"} exchange={exchange} handleClick={this._handleClick}
                               active={true}/>
                  :
                  <SideBarItem key={i + "HomeSideBar-not-active"} exchange={exchange} handleClick={this._handleClick}
                               active={false}/>
              )
            })
          ) : (<p className="mt-3 pr-3"><b>شما عضو هیچ بورسی نیستید!</b></p>)
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  clientExchangeIdentities: state.auth.client.exchange_identities
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeIdentities: ExchangeActions.getExchangeIdentitiesByMemberIdentity
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeSideBar)