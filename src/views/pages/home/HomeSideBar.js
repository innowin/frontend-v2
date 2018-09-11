// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import ExchangeActions from "src/redux/actions/exchangeActions"
import type {exchangeType} from "src/consts/flowTypes/exchange/exchange.js"
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
    const {exchange_image, name, description, id: exchangeId} = this.props.exchange
    return (
      <div className={`item-wrapper ${ active ? 'active' : ''}`} onClick={this._onClickHandler}>
        <div className="header-exchange">
          {!exchange_image ? <DefaultExchangeIcon className="default-logo"/> :
            <img className="img-logo" src={exchange_image.file} alt="logo"/>
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
  activeExchangeId: ?number,
  setExchangeId: Function,
  classNames?: string,
  clientExchanges: ({ id: number })[],
  isLoading: boolean,
  error: ?string,
  actions: {
    getExchangeIdentities: Function
  }
|}

class HomeSideBar extends Component<PropsHomeSideBar, StateHomeSideBar> {
  static propTypes = {
    identityId: PropTypes.number.isRequired,
    activeExchangeId: PropTypes.number,
    setExchangeId: PropTypes.func.isRequired,
    classNames: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {activeId: null}
  }

  _handleClick = (id) => {
    const {setExchangeId} = this.props
    setExchangeId(id)
  }

  componentDidUpdate(prevProps) {
    const {setExchangeId, clientExchanges} = this.props
    if (!prevProps.activeExchangeId && clientExchanges.length > 0) {
      setExchangeId(clientExchanges[0].id)
    }
  }

  componentDidMount() {
    const {identityId} = this.props
    const {getExchangeIdentities} = this.props.actions
    getExchangeIdentities(identityId)
  }

  render() {
    const {clientExchanges, classNames, activeExchangeId} = this.props
    return (
      <div className={classNames}>
        {
          (clientExchanges && clientExchanges.length > 0) ? (
            clientExchanges.map((exchange, i) => {
              return (
                (exchange.id === activeExchangeId) ?
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


const mapStateToProps = state => {
  const allExchanges = state.exchanges.list
  const ids = state.auth.client.exchanges
  const clientExchanges = ids.map((exchangeId) =>
    (allExchanges[exchangeId] ? allExchanges[exchangeId].exchange.content : [])
  )
  const isLoading = ids.map((exchangeId) =>
    (allExchanges[exchangeId] ? allExchanges[exchangeId].exchange.isLoading : false)
  ).includes(true)
  const error = ids.map((exchangeId) =>
    (allExchanges[exchangeId] ? allExchanges[exchangeId].exchange.error : null)
  )
  return {
    clientExchanges,
    isLoading,
    error
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeIdentities: ExchangeActions.getExchangeIdentitiesByMemberIdentity
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeSideBar)