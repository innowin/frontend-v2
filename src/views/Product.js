import React, {Component} from 'react'
import ProductView from './product/ProductView'
import ProductExplorer from './product/explore/Explore'
import PrivateRoute from "../consts/PrivateRoute"
import {Switch} from 'react-router-dom'

// import TopBar from "./bars/TopBar"

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {path} = this.props.match
    return (
        <Switch>
          <PrivateRoute exact path={`${path}/Product_Explorer`} component={ProductExplorer}/>
          <div className="-main -userOrganBackgroundImg">
            <PrivateRoute path={`${path}/:id`} component={ProductView}/>
          </div>
        </Switch>
    )
  }
}

export default Product