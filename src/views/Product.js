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
    const widthOfRightBar = "col-md-3 col-sm-2";
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut} collapseWidthCol={widthOfRightBar} />
        <main>
          <Switch>
            <PropsRoute exact path={`${path}/Product_Explorer`} component={ProductExplorer}
                        widthOfRightBar={widthOfRightBar}/>
            <PropsRoute path={`${path}/:id`} component={ProductView} widthOfRightBar={widthOfRightBar}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default Product;