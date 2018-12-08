import React, {Component} from 'react'
import ProductView from './product/ProductView'
import ProductExplorer from './product/ProductExplorer'
import PrivateRoute from "../consts/PrivateRoute"
import {Switch} from 'react-router-dom'
import TopBar from "./bars/TopBar"

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {path} = this.props.match
    return (
        <div className="-main -userOrganBackgroundImg">
          <main>
            <Switch>
              <PrivateRoute exact path={`${path}/Product_Explorer`} component={ProductExplorer}/>
              <PrivateRoute path={`${path}/:id`} component={ProductView}/>
            </Switch>
          </main>
        </div>
    )
  }
}

export default Product