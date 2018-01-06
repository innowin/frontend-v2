import React,{Component} from 'react';
import {Route, Switch ,Link} from 'react-router-dom';
import ExchangeView from './exchange/Exchange';
import ExchangeExplorer from './exchange/Exchange_Explorer';

class Exchange extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		const {match} = this.props;
		const {path , url} = match;
		return(
			<div>
				<Link to={`${url}/Exchange_Explorer`}>Exchange Explorer</Link>
				<Link to={`${url}`}>Exchange</Link>
				<div>
					<Switch>
						<Route exact path={`${path}/`} component={ExchangeView}/>
						<Route path={`${path}/Exchange_Explorer`} component={ExchangeExplorer}/>
					</Switch>
				</div>
			</div>
		)
	}
}

export default Exchange;