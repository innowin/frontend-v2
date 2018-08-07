import React,{Component} from 'react';
import {Switch ,Link} from 'react-router-dom';
import ExchangeView from './exchange/Exchange_View';
import ExchangeExplorer from './exchange/Exchange_Explorer';
import ExchangePost from './exchange/ExchangeView/post/index';
import PrivateRoute from "../consts/PrivateRoute";

class Exchange extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		const {path , url} = this.props.match
		return(
			<div>
				<Link to={`${url}/Exchange_Explorer`}>Exchange Explorer</Link>
				<Link to={`${url}`}>Exchange</Link>
				<div>
					<Switch>
						<PrivateRoute path={`${path}/Exchange_Explorer`} component={ExchangeExplorer}/>
						<PrivateRoute exact path={`${path}/:id`} component={ExchangeView} />
						<PrivateRoute exact path={`${path}/:exchangeId/post/:postId`} component={ExchangePost} />
					</Switch>
				</div>
			</div>
		)
	}
}

export default Exchange;