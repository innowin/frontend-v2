import React, {Component} from 'react';
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome';
import {SOCKET as socket} from "src/consts/URLS";
import {getExchangeIdentities} from "src/crud/exchange/exchange";

export const SideBarItem = ({name, image, exchange_id: id, handleClick, active}) => {
	
	const onClickHandler = () => {
		handleClick(id);
	};
	
	return (
			<div className={`item-wrapper${ active ? ' active' : ''}`} onClick={onClickHandler}>
				{!image ? <div className="default-logo"><FontAwesome name="building-o" aria-hidden="true"/></div> :
						<img src={image} alt="logo"/>}
				<div className="company-title">{name}</div>
			</div>
	)
};


export default class HomeSideBar extends Component {
  static propTypes = {
    get_exchangeId: PropTypes.func.isRequired,
    identity:PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {activeId: null, exchangeIdentities:[]}
  }

  _handleClick = (id) => {
    const {get_exchangeId} = this.props;
    this.setState({...this.state, activeId: id});
    get_exchangeId(id);
  };

  _getExchangeIdentities = (identity) => {
    const _handleResult = (res) => {
      this.setState({...this.state, exchangeIdentities: res})
    };
    getExchangeIdentities(identity, _handleResult);
  }
  ;
  componentDidMount(){
    this._getExchangeIdentities(this.props.identity)
  }

  componentWillUnmount () {
    socket.off("EXCHANGE_LIST_HOME_SIDEBAR", res => {
      this.setState({...this.state, exchangeIdentities: res});
    });
  }

  render() {
    const {exchangeIdentities} = this.state;
    return (
      <div>
        {
          exchangeIdentities.map((item, i) => {
            const {name, exchange_image: image, description, id} = item.exchange_identity_related_exchange;
            const {activeId} = this.state;
            return (
              (id === activeId) ?
                <SideBarItem key={i} name={name} image={image} exchange_id={id} description={description}
                             handleClick={this._handleClick} active={true}/>
                :
                <SideBarItem key={i} name={name} image={image} exchange_id={id} description={description}
                             handleClick={this._handleClick} active={false}/>
            )
          })
        }
      </div>
    )
  }
}