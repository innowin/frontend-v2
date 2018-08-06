import React, {Component} from 'react';
import ProductView from './product/ProductView';
import ProductExplorer from './product/ProductExplorer';
import PrivateRoute from "../consts/PrivateRoute"
import {Switch} from 'react-router-dom';
import TopBar from "./bars/TopBar";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {path} = this.props.match
    const widthOfRightBar = "col-md-3 col-sm-2"
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar collapseWidthCol={widthOfRightBar} />
        <main>
          <Switch>
            <PrivateRoute exact path={`${path}/Product_Explorer`} component={ProductExplorer} widthOfRightBar={widthOfRightBar}/>
            <PrivateRoute path={`${path}/:id`} component={ProductView} widthOfRightBar={widthOfRightBar}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default Product;