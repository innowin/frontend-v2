import React, {Component} from 'react';
import TopBar from "../bars/TopBar";
import ChatBar from '../bars/ChatBar';
import HomeSideBar from './home/HomeSideBar';
import HomePosts from './home/HomePosts';
import {IDENTITY_ID} from "src/consts/data";

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {activeExchangeId: null}
	}
	
	_setExchangeId = (exchangeId) => {
		const {activeExchangeId} = this.state
		if (exchangeId !== activeExchangeId) {
			this.setState({...this.state, activeExchangeId: exchangeId})
		}
	}
	
	render() {
		const {handleSignOut} = this.props
		let {activeExchangeId} = this.state
		const widthOfRightBar = "col-md-3 col-sm-2"
		return (
				<div className="home-wrapper">
					<TopBar handleSignOut={handleSignOut} collapseWidthCol={widthOfRightBar}/>
					<main>
						<HomeSideBar identityId={IDENTITY_ID} setExchangeId={this._setExchangeId}
												 classNames={`${widthOfRightBar} pr-0 pl-0 -right-sidebar-wrapper`}/>
						<div className="col-md-7 col-sm-9 pr-5-percent -content-wrapper -home-content-wrapper">
							<HomePosts identityId={IDENTITY_ID} exchangeId={activeExchangeId}/>
						</div>
						<div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
							<ChatBar/>
						</div>
					</main>
				
				</div>
		)
	}
}

export default Home