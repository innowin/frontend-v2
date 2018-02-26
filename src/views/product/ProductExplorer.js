import React , {Component} from 'react';
import ProductFilterSidebar from "../bars/FilterSideBar";


export default class ProductExplorer extends Component {
	
	render() {
		return (
				<div  className="product-explorer ">
					<div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
						<ProductFilterSidebar/>
					</div>
					<div className="col-md-8 col-sm-10  -content-wrapper">Product Explorer</div>
				</div>
		)
	}
}
