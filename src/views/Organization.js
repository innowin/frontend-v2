import React,{Component} from 'react';
import BasicInformation from './organization/Basic_Information';
import Certificates from './organization/Certificates';
import Customers from './organization/Customers';
import Posts from './organization/Posts';
import Products from './organization/Products';
import {Link , Route , Switch} from 'react-router-dom';
import Skills from './organization/Skills';
import Social from './organization/Social';
import OrganizationSideView from './organization/components/SideView';
import TopBar from "./TopBar";

class Organization extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const {match} = this.props;
		const {path, url} = match;
		const rightSidebar =
            <div className="row align-items-center">
                <div className="col text-center">
                    <div className="mt-4 mb-4">
                        <OrganizationSideView {...this.props}/>
                    </div>
                </div>

            </div>;
		return (
			<div className="page-wrapper">
				<div className="left-sidebar-wrapper" >
				</div>
				<div className="right-sidebar-wrapper">
					{rightSidebar}
				</div>
				<div className="content-wrapper">
						<div className="container-fluid">
							<Link to={`${url}/Basic_Information`}>Basic Information</Link>
							<Link to={`${url}/Products`}>Products</Link>
							<Link to={`${url}/Posts`}>Posts</Link>
							<Link to={`${url}/Customers`}>Customers</Link>
							<Link to={`${url}/Social_connections`}>Social connections</Link>
							<Link to={`${url}/Skills`}>Skills</Link>
							<Link to={`${url}/Certificates`}>Certificates</Link>
							<Switch>
								<Route path={`${path}/Basic_Information`} component={BasicInformation}/>
								<Route path={`${path}/Products`} component={Products}/>
								<Route path={`${path}/Posts`} component={Posts}/>
								<Route path={`${path}/Customers`} component={Customers}/>
								<Route path={`${path}/Social_Connections`} component={Social}/>
								<Route path={`${path}/Skills`} component={Skills}/>
								<Route path={`${path}/Certificates`} component={Certificates}/>
							</Switch>
						</div>
				</div>
				<div>
					<TopBar/>
					<div>
						{/* TODO : side bar component should be placed here*/}
					</div>
					<div>
						<Link to={`${url}/Basic_Information`}>Basic Information</Link>
						<Link to={`${url}/Products`}>Products</Link>
						<Link to={`${url}/Posts`}>Posts</Link>
						<Link to={`${url}/Customers`}>Customers</Link>
						<Link to={`${url}/Social_connections`}>Social connections</Link>
						<Link to={`${url}/Skills`}>Skills</Link>
						<Link to={`${url}/Certificates`}>Certificates</Link>
						<Switch>
							<Route path={`${path}/Basic_Information`} component={BasicInformation}/>
							<Route path={`${path}/Products`} component={Products}/>
							<Route path={`${path}/Posts`} component={Posts}/>
							<Route path={`${path}/Customers`} component={Customers}/>
							<Route path={`${path}/Social_Connections`} component={Social}/>
							<Route path={`${path}/Skills`} component={Skills}/>
							<Route path={`${path}/Certificates`} component={Certificates}/>
						</Switch>
					</div>
					<div>
						{/* TODO : char bar component should be placed here*/}
					</div>
				</div>
			</div>
		)
	}
}

export default Organization;