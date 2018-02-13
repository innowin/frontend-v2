import React , {Component} from 'react';
import {REST_REQUEST} from "../../../consts/Events";
import {SOCKET as socket , REST_URL as url} from "../../../consts/URLS"
import {IDENTITY_ID as identity , TOKEN as token} from "src/consts/data";
import FontAwesome from 'react-fontawesome';

export const SideBarItem = ({name , image , exchange_id : id ,handleClick , active}) => {
	
	const onClickHandler = () => {
		handleClick(id);
	};
	
	return (
			<div className={`item-wrapper${ active ? ' active' : ''}`} onClick={onClickHandler}>
				{!image? <div className="default-logo" ><FontAwesome name="building-o" aria-hidden="true"/></div> : <img src={image} alt="logo" /> }
				<div className="company-title">{name}</div>
			</div>
	)
};


export default class HomeSideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeId : null,
			items : []
		}
	}

	componentDidMount(){
		socket.emit(REST_REQUEST , {
			method: "get",
			url: url + `/exchanges/identities/?identities_exchange=${identity}`,
			result: "EXCHANGE_LIST_HOME_SIDEBAR",
			token,
		});
		socket.on("EXCHANGE_LIST_HOME_SIDEBAR", res => {
			console.log('res arrived',identity,res);
			this.setState({...this.state , items : res });
		});
	}
	
	componentWillUnmount () {
		socket.off("EXCHANGE_LIST_HOME_SIDEBAR", res => {
			console.log('res arrived',identity,res);
			this.setState({...this.state , items : res });
		});
	}
	
	_handleClick = (id) => {
		const {get_posts} = this.props;
		this.setState({...this.state, activeId: id});
		get_posts(id);
	};
	
	render () {
		const {items} = this.state;
		return (
				<div>
					{
						items.map((item , i) => {
							const {name , exchange_image : image, description , id } = item.exchange_identity_related_exchange;
							const {activeId} = this.state;
							return (
									(id === activeId) ?
									<SideBarItem key={i} name={name} image={image} exchange_id={id} description={description} handleClick={this._handleClick} active={true} />
										:
									<SideBarItem key={i} name={name} image={image} exchange_id={id} description={description} handleClick={this._handleClick} active={false} />
							)
						})
					}
				</div>
		)
	}
}