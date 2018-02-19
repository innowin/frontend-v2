import React,{Component} from 'react';
import ProductView from './product/ProductView';
import ProductExplorer from './product/ProductExplorer';
import {Route , Switch} from 'react-router-dom';
import TopBar from "./bars/TopBar";
import ProductFilterSidebar from "./bars/FilterSideBar";

class Product extends Component {
	constructor (props) {
		super (props);
		this.state = {
		}
	}
	render () {
		const {match ,handleSignOut} = this.props;
		const {path} = match;
		return (
				<div className="product-explorer">
					<TopBar handleSignOut={handleSignOut} />
					<main className="row">
						<div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
							<ProductFilterSidebar/>
						</div>
						<div className="col-md-8 col-sm-10  -content-wrapper">
							<Switch>
								<Route path={`${path}/Product_Explorer`} component={ProductExplorer}/>
								<Route exact path={`${path}/:id`} component={ProductView}/>
							</Switch>
						</div>
					</main>
				</div>
		)
	}
}

export default Product;