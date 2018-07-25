import React, {Component} from "react"
import PropTypes from "prop-types"
import {DefaultExchangeIcon} from "src/images/icons"
import {Link} from "react-router-dom"
import {SeeViewIcon, RefreshIcon, SettingIcon} from "src/images/icons"

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

export class SideBarItem extends Component {

  static propTypes = {
    exchange: PropTypes.object.isRequired,
    handleClick: PropTypes.func,
    active: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {file: null}
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


export default class HomeSideBar extends Component {
  static propTypes = {
    setExchangeId: PropTypes.func.isRequired,
    classNames: PropTypes.string,
    exchangeIdentities: PropTypes.arrayOf(PropTypes.object.isRequired)
  }

  constructor(props) {
    super(props)
    this.state = {activeId: null}
  }

  _handleClick = (id) => {
    const {setExchangeId} = this.props
    this.setState({...this.state, activeId: id}, () => setExchangeId(id))
  }

  render() {
    const {exchangeIdentities, classNames} = this.props
    return (
      <div className={classNames}>
        {
          (exchangeIdentities && exchangeIdentities.length > 0) ? (
            exchangeIdentities.map((item, i) => {
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