import React, {Component} from "react"
import Exchange from "./Exchange"
import Home from "./pages/Home"
import Organization from "./Organization"
import PrivateRoute from "../consts/PrivateRoute"
import Product from "./Product"
import ProductsTest from "./pages/adding-contribution/addingContribution"
import User from "./User"
import {Switch} from "react-router-dom"

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {layout: true}
  }

  render() {
    return (
      <Switch>
        <PrivateRoute exact={true} path="/" component={Home}/>
        <PrivateRoute path="/user/:id" component={User}/>
        <PrivateRoute path="/organization/:id" component={Organization}/>
        <PrivateRoute path="/exchange" component={Exchange}/>
        <PrivateRoute path="/product" component={Product}/>
        <PrivateRoute path="/testOf" component={ProductsTest}/>
      </Switch>
    )
  }
}

export default Layout