/*global__*/
import React,{Component} from 'react';
import TopBar from '../bars/TopBar';
import ChatBar from '../bars/ChatBar';
import PropTypes from 'prop-types';
import ExchangeViewBar from "../bars/ExchangeViewBar";
import ExchangePosts from './ExchangeView/posts/index';

export default class ExchangeView extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		handleSignOut: PropTypes.func.isRequired
	};
	
	render (){
		const {handleSignOut} = this.props;
    const {params} = this.props.match;
    const exchangeId = +params.id;
    const widthOfRightBar = "col-md-2 col-sm-1";
		return (
				<div className="-tabbed-pages -userOrganBackgroundImg">
					<TopBar handleSignOut={handleSignOut} collapseWidthCol={widthOfRightBar}/>
					<main className="row">
						<div className={`-right-sidebar-wrapper ${widthOfRightBar}`}>
							<ExchangeViewBar exchangeId={exchangeId}/>
						</div>
						<div className="col-md-8 col-sm-10 -content-wrapper">
							<ExchangePosts exchangeId={exchangeId}/>
						</div>
						<div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
							<ChatBar/>
						</div>
					</main>
				</div>
		)
	}
};