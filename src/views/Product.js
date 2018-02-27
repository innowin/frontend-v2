import React, {Component} from 'react';
import ProductView from './product/ProductView';
import ProductExplorer from './product/ProductExplorer';
import PropsRoute from "../consts/PropsRoute"
import {Switch} from 'react-router-dom';
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
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut}/>
        <main>
          <Switch>
            <PropsRoute exact path={`${path}/Product_Explorer`} component={ProductExplorer}/>
            <PropsRoute path={`${path}/:id`} component={ProductView}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default Product;