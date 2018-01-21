import React, {Component} from "react"
import BasicInformation from "./organization/Basic_Information"
import Certificates from "./organization/Certificates"
import ChatBar from "./bars/ChatBar"
import Customers from "./organization/Customers"
import Posts from "./organization/Posts"
import Products from "./organization/Products"
import Sidebar from "src/views/bars/SideBar"
import Skills from "src/views/organization/skills/index"
import Social from "./organization/Social"
import TopBar from "./bars/TopBar"
import {NavLink, Route, Switch, Redirect} from "react-router-dom"
import {Tabs} from "src/views/common/cards/Frames"
import {userInfoIcon, postIcon, certificateIcon, skillIcon} from "../images/icons"

class Organization extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		const {match, handleSignOut} = this.props;
		const {path, url} = match;
		
		return (
				<div className="-tabbed-pages -userOrganBackgroundImg">
					<TopBar handleSignOut={handleSignOut}/>
					<main className="row">
						<div className="col-3 -right-sidebar-wrapper">
							<Sidebar/>
						</div>
						<div className="col-6 -content-wrapper">
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
								<Redirect exact from={`${path}/`} to={`${path}/basicInformation`}/>
								<Route exact path={`${path}`} component={BasicInformation}/>
								<Route path={`${path}/Products`} component={Products}/>
								<Route path={`${path}/Posts`} component={Posts}/>
								<Route path={`${path}/Customers`} component={Customers}/>
								<Route path={`${path}/SocialConnections`} component={Social}/>
								<Route path={`${path}/Skills`} component={Skills}/>
								<Route path={`${path}/Certificates`} component={Certificates}/>
							</Switch>
						</div>
						<div className="col-3 -left-sidebar-wrapper">
							<ChatBar/>
						</div>
					</main>
				</div>
		)
	}
}

export default Organization;