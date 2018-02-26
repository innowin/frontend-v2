import React, {Component} from 'react';
import ProductView from './product/ProductView';
import ProductExplorer from './product/ProductExplorer';
import {Route, Switch} from 'react-router-dom';
import TopBar from "./bars/TopBar";

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		const {match, handleSignOut} = this.props;
		const {path} = match;
		return (
				<div>
					<TopBar handleSignOut={handleSignOut}/>
					<main className="row">
						<Switch>
							<Route path={`${path}/Product_Explorer`} component={ProductExplorer}/>
							<Route exact path={`${path}/:id`} component={ProductView}/>
						</Switch>
					</main>
				</div>
		)
	}
}

export default Product;