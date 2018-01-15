import React,{Component} from 'react';
import BasicInformation from './organization/Basic_Information';
import Certificates from './organization/Certificates';
import Customers from './organization/Customers';
import Posts from './organization/Posts';
import Products from './organization/Products';
import {Link , Route , Switch} from 'react-router-dom';
import Skills from 'src/views/organization/skills/index';
import Social from './organization/Social';
import TopBar from "./bars/TopBar";
import {Sidebar} from 'src/views/bars/SideBar';

class Organization extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount(){
		//TODO amir #
	}

	render() {
		const {match , handleSignOut} = this.props;
		const {organization} = this.state;
		const {path, url} = match;

		return (
			<div className="page-wrapper">
				<div className="left-sidebar-wrapper" >
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
					<TopBar handleSignOut={handleSignOut}/>
					<Sidebar>
						{
						<div>
							<img alt="" src={organization.logo.url} style={{maxWidth:100}}/>
							<h6 style={{padding:20}}>شرکت :{organization.nikeName || "نام شرکت"}</h6>
							<h6 style={{padding:5,fontWeight:0,fontSize:13}}>{organization.description}</h6>
							<div className="row" style={{marginTop:30}}>
								<div className="col">
									<button type="button" style={{fontFamily:'IRANSans',borderColor:'#606060',color:'#606060'}} className="btn btn-outline-secondary btn-block">دنبال کردن</button>
								</div>
								<div className="col">
									<button type="button" style={{fontFamily:'IRANSans',borderColor:'#606060',color:'#606060'}} className="btn btn-outline-secondary btn-block">ارسال پیام</button>
								</div>
							</div>
						</div>
						}
					</Sidebar>
					<div>
						<Link to={`${url}`}>Basic Information</Link>
						<Link to={`${url}/Products`}>Products</Link>
						<Link to={`${url}/Posts`}>Posts</Link>
						<Link to={`${url}/Customers`}>Customers</Link>
						<Link to={`${url}/Social_connections`}>Social connections</Link>
						<Link to={`${url}/Skills`}>Skills</Link>
						<Link to={`${url}/Certificates`}>Certificates</Link>
						<Switch>
							<Route exact path={`${path}`} component={BasicInformation}/>
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