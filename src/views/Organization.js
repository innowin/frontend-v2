import React, {Component} from "react";
import Certificates from "./organization/certificates/index";
import ChatBar from "./bars/ChatBar";
import Customers from "./organization/customers/index";
import Posts from "src/views/common/post/index";
import Products from "./organization/products/index";
import PrivateRoute from "../consts/PrivateRoute"
import PropTypes from "prop-types";
import Sidebar from "src/views/bars/SideBar";
import Social from "src/views/organization/social/index";
import TopBar from "./bars/TopBar";
import {default as BasicInformation} from "./organization/basicInformation/index";
import {NavLink, Switch, Redirect} from "react-router-dom";
import {OrganizationSideView} from "src/views/bars/SideBar";
import {Tabs} from "src/views/common/cards/Frames";
import {ContributionIcon, postIcon, certificateIcon, InformationIcon, SocialIcon, customerIcon} from "../images/icons";

export class Organization extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    handleSignOut: PropTypes.func.isRequired
  };

  render() {
    const {match, handleSignOut} = this.props;
    const {path, url, params} = match;
    const organizationId = params.id;
    const widthOfRightBar = "col-md-2 col-sm-1";
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut} collapseWidthCol={widthOfRightBar}/>
        <main className="row">
          <div className={`${widthOfRightBar} -right-sidebar-wrapper pr-0 pl-0`}>
            <OrganizationSideView organizationId={organizationId}/>
          </div>
          <div className="col-md-8 col-sm-10 -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/Products`} activeClassName="-active">
                <ContributionIcon/>
              </NavLink>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">
                {postIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">
                <InformationIcon/>
              </NavLink>
              <NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">
                <SocialIcon/>
              </NavLink>
              <NavLink className="-tab" to={`${url}/Customers`} activeClassName="-active">
                {customerIcon()}
              </NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active">
                {certificateIcon}
              </NavLink>
            </Tabs>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/Products`}/>
              <PrivateRoute path={`${path}/Products`} component={Products} organizationId={organizationId}/>
              <PrivateRoute path={`${path}/Posts`} component={Posts} id={organizationId} identityType='organization'/>
              <PrivateRoute exact path={`${path}/basicInformation`} component={BasicInformation}
                          organizationId={organizationId}/>
              <PrivateRoute path={`${path}/Customers`} component={Customers} organizationId={organizationId}/>
              <PrivateRoute path={`${path}/SocialConnections`} component={Social} organizationId={organizationId}/>
              <PrivateRoute path={`${path}/Certificates`} component={Certificates} organizationId={organizationId}/>
            </Switch>
          </div>
          <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
        </main>
      </div>
    )
  }
}

export default (props) => {
  const match = props.match;
  const handleSignOut = props.handleSignOut;
  return <Organization match={match} handleSignOut={handleSignOut}/>
};