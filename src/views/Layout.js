import React, {Component} from "react"
import Exchange from "./Exchange"
import Home from "./pages/Home"
import Organization from "./Organization"
import PrivateRoute from "../consts/PrivateRoute"
import Product from "./Product"
import User from "./User"
import {Switch} from "react-router-dom"
import User_Explorer from './user/explore/Explore'
import TopBar from "./bars/TopBar"
import ToastContainer from "./common/components/ToastContainer";


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {layout: true}
  }

  render() {
    const path = this.props.location.pathname
    return (
        <div className='pages-wrapper global-wrapper'>

          <TopBar path={path} collapseClassName="col user-sidebar-width"/>

          <Switch>
            <PrivateRoute exact={true} path="/" component={Home}/>
            <PrivateRoute path="/user/:id" component={User}/>
            <PrivateRoute path="/organization/:id" component={Organization}/>
            <PrivateRoute path="/exchange" component={Exchange}/>
            <PrivateRoute path="/product" component={Product}/>
            <PrivateRoute path="/users/Users_Explorer" component={User_Explorer}/>

            {/*Prevent wrong paths*/}
            {/*<PrivateRoute path="*" component={Home}/>*/}

          </Switch>
          <ToastContainer/>
        </div>
    )
  }
}

export default Layout