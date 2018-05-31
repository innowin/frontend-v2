import React, {Component} from 'react';
import Home from './pages/Home';
import PropsRoute from '../consts/PropsRoute'
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
					<PropsRoute exact={true} path="/" component={Home} handleSignOut={handleSignOut}/>
					<PropsRoute path="/user/:id" component={User} handleSignOut={handleSignOut}/>
					<PropsRoute path="/organization/:id" component={Organization} handleSignOut={handleSignOut}/>
					<PropsRoute path="/exchange" component={Exchange} handleSignOut={handleSignOut}/>
					<PropsRoute path="/product" component={Product} handleSignOut={handleSignOut}/>
					<PropsRoute path="/testOf" component={ProductsTest} handleSignOut={handleSignOut}/>
				</Switch>
		)
	}
}

export default Layout;