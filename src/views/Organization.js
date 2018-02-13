import React,{Component} from "react";
import Certificates from "./organization/certificates/index";
import ChatBar from "./bars/ChatBar";
import Customers from "./organization/Customers";
import Posts from "./organization/posts/index";
import Products from "./organization/Products";
import PropsRoute from "../consts/PropsRoute"
import PropTypes from "prop-types";
import Sidebar from "src/views/bars/SideBar";
import Skills from "src/views/organization/skills/index";
import Social from "./organization/Social";
import TopBar from "./bars/TopBar";
import {default as BasicInformation} from "./organization/basicInformation/index";
import {NavLink , Switch, Redirect} from "react-router-dom";
import {OrganizationSideView} from "src/views/bars/SideBar";
import {Tabs} from "src/views/common/cards/Frames";
import {userInfoIcon, postIcon, certificateIcon, skillIcon} from "../images/icons";

export class Organization extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    handleSignOut: PropTypes.func.isRequired
  };

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const {match , handleSignOut} = this.props;
		const {path, url, params} = match;
    const organizationId = params.id;
		return (
			<div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar handleSignOut={handleSignOut}/>
        <main className="row">
          <div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
            <Sidebar>
              <OrganizationSideView organizationId={organizationId}/>
            </Sidebar>
          </div>
          <div className="col-md-8 col-sm-10  -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">
                {userInfoIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/Products`} activeClassName="-active">
                {postIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">
                {postIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/Customers`} activeClassName="-active">
                {postIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">
                {postIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/Skills`} activeClassName="-active">
                {skillIcon}
              </NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active">
                {certificateIcon}
              </NavLink>
            </Tabs>
              <Switch>
                <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
                <PropsRoute exact path={`${path}/basicInformation`} component={BasicInformation} organizationId={organizationId}/>
                <PropsRoute path={`${path}/Products`} component={Products} organizationId={organizationId}/>
                <PropsRoute path={`${path}/Posts`} component={Posts} organizationId={organizationId }/>
                <PropsRoute path={`${path}/Customers`} component={Customers} organizationId={organizationId}/>
                <PropsRoute path={`${path}/SocialConnections`} component={Social} organizationId={organizationId}/>
                <PropsRoute path={`${path}/Skills`} component={Skills} organizationId={organizationId}/>
                <PropsRoute path={`${path}/Certificates`} component={Certificates} organizationId={organizationId}/>
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