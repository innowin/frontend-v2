import React, {Component} from 'react';
import Home from './pages/Home';
import PrivateRoute from '../consts/PrivateRoute'
import User from './User';
import Exchange from './Exchange';
import Organization from './Organization';
import {Switch} from 'react-router-dom';
import Product from './Product';
import ProductsTest from './pages/adding-contribution/adding-contribution'

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {layout: true}
	}
	
	render() {
		const {handleSignOut} = this.props;
		return (
				<Switch>
					<PrivateRoute exact={true} path="/" component={Home} handleSignOut={handleSignOut}/>
					<PrivateRoute path="/user/:id" component={User} handleSignOut={handleSignOut}/>
					<PrivateRoute path="/organization/:id" component={Organization} handleSignOut={handleSignOut}/>
					<PrivateRoute path="/exchange" component={Exchange} handleSignOut={handleSignOut}/>
					<PrivateRoute path="/product" component={Product} handleSignOut={handleSignOut}/>
					<PrivateRoute path="/testOf" component={ProductsTest} handleSignOut={handleSignOut}/>
				</Switch>
		)
	}
}

export default Layout;