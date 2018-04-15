import React,{Component} from 'react';
import TopBar from '../bars/TopBar';
import ChatBar from '../bars/ChatBar';
import PropTypes from 'prop-types';
import Posts from './cardView/index';

export default class ExchangeView extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		handleSignOut: PropTypes.func.isRequired
	};
	
	render (){
		const {handleSignOut} = this.props;
		return (
				<div className="-tabbed-pages -userOrganBackgroundImg">
					<TopBar handleSignOut={handleSignOut}/>
					<main className="row">
						<div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
							{/*SideBar should be added here*/}
							side bar
						</div>
						<div className="col-md-8 col-sm-10 -content-wrapper">
							<Posts exchangeId={match.params.id}/>
						</div>
						<div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
							<ChatBar/>
						</div>
					</main>
				</div>
		)
	}
};