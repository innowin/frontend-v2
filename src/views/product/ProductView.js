import React, {Component} from 'react';
import {InformationIcon, postIcon, certificateIcon, RatingIcon} from "../../images/icons";
import ProductPosts from "../product/posts";
import ProductBasicInformation from "../product/basicInformation";
import ProductCertificates from "../product/certificates";
import ProductRating from "../product/ratings";
import ChatBar from "../bars/ChatBar";
import Sidebar from "../bars/SideBar";
import {Tabs} from "../common/cards/Frames";
import {NavLink, Switch, Redirect} from "react-router-dom"
import PropsRoute from "src/consts/PropsRoute"
import PropTypes from "prop-types";
import ProductSideView from "../bars/ProductBar";

export default class ProductView extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  render() {
    const {match} = this.props;
    const {path ,url, params} = match;
    const productId = +(params.id);
    return (
      <div className="row">
        <div className="col-md-3 col-sm-2 -right-sidebar-wrapper">
          <Sidebar>
            <ProductSideView productId={productId}/>
          </Sidebar>
        </div>
        <div className="col-md-6 col-sm-9  -content-wrapper">
          <Tabs>
            <NavLink className="-tab" to={`${url}/basicInformation`}
                     activeClassName="-active"><InformationIcon/></NavLink>
            <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active">{certificateIcon}</NavLink>
            <NavLink className="-tab" to={`${url}/Ratings`} activeClassName="-active"><RatingIcon/></NavLink>
            <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
          </Tabs>
          <div>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
              <PropsRoute path={`${path}/basicInformation`} component={ProductBasicInformation} productId={productId}/>
              <PropsRoute path={`${path}/Certificates`} component={ProductCertificates} productId={productId}/>
              <PropsRoute path={`${path}/Ratings`} component={ProductRating} productId={productId}/>
              <PropsRoute path={`${path}/Posts`} component={ProductPosts} productId={productId}/>
            </Switch>
          </div>
        </div>
        <div className="col-md-3 col-sm-1 -left-sidebar-wrapper">
          <ChatBar/>
        </div>
      </div>
    )
  }
}
