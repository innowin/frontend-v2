import React , {Component} from 'react';
import {REST_REQUEST} from "../../../consts/Events";
import {SOCKET as socket , REST_URL as url} from "../../../consts/URLS"
import {IDENTITY_ID as identity , TOKEN as token} from "src/consts/data"

const SideBarItem = () => {
	return (
			<div>
				Item
			</div>
	)
}


export default class HomeSideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {}
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
		})
	}
	render () {
		return (
				<div>
					this is side bar
					<SideBarItem/>
				</div>
		)
	}
}