import React, {Component} from 'react';
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome';
import {SOCKET as socket} from "src/consts/URLS";
import {getExchangeIdentities} from "src/crud/exchange/exchange";
import {getFile} from "../../../crud/media/media";

export class SideBarItem extends Component {

  static propTypes = {
    name: PropTypes.string,
    imageId: PropTypes.number,
    exchangeId: PropTypes.number,
    handleClick: PropTypes.func,
    active: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {file: null}
  }

  _onClickHandler = () => {
    const {handleClick, exchangeId} = this.props;
    handleClick(exchangeId);
  };

  componentDidMount(){
    getFile(this.props.imageId, (res) =>(this.setState({file:res.file})))
  }

  render() {
    const {imageId, active, name} = this.props;
    const {file} = this.state;
    return (
      <div className={`item-wrapper${ active ? ' active' : ''}`} onClick={this._onClickHandler}>
        {!imageId ? <div className="default-logo"><FontAwesome name="building-o" aria-hidden="true"/></div> :
          <img src={file} alt="logo"/>}
        <div className="company-title">{name}</div>
      </div>
    )
  }
}


export default class HomeSideBar extends Component {
  static propTypes = {
    setExchangeId: PropTypes.func.isRequired,
    identityId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {activeId: null, exchangeIdentities: []}
  }

  _handleClick = (id) => {
    const {setExchangeId} = this.props;
    this.setState({...this.state, activeId: id} , () => setExchangeId(id));
  };

  componentDidMount() {
    const handleResult = (res) => {
      if (Array.isArray(res) && res.length > 0) { //  Array.isArray(res) added by ali for more check.
        this.setState({...this.state, exchangeIdentities: res, activeId: res[0].exchange_identity_related_exchange.id})
      }
    };
    getExchangeIdentities(this.props.identityId, handleResult)
  }

  componentWillUnmount() {
    socket.off("EXCHANGE_LIST_HOME_SIDEBAR", res => {
      this.setState({...this.state, exchangeIdentities: res});
    });
  }

  render() {
    const {exchangeIdentities} = this.state;
    return (
      <div>
        {
          (exchangeIdentities.length > 0) ? (
            exchangeIdentities.map((item, i) => {
              const {name, exchange_image: imageId, description, id} = item.exchange_identity_related_exchange;
              const {activeId} = this.state;
              return (
                (id === activeId) ?
                  <SideBarItem key={i} name={name} imageId={imageId} exchangeId={id} description={description}
                               handleClick={this._handleClick} active={true}/>
                  :
                  <SideBarItem key={i} name={name} imageId={imageId} exchangeId={id} description={description}
                               handleClick={this._handleClick} active={false}/>
              )
            })
          ) : (<p className="mt-3"><b>شما عضو هیچ بورسی نیستید!</b></p>)
        }
      </div>
    )
  }
}