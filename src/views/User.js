import React,{Component} from "react"
import  Career from "./user/Career"
import  Certificates from "./user/Certificates"
import  Posts from "./user/Posts"
import  Skills from "./user/Skills"
import  UserBasicInformation from "./user/basicInformation/index"
import {Link , Route , Switch} from "react-router-dom"

class User extends Component {
	constructor (props) {
		super (props);
		this.state = {
		}
	}
	
	render(){
		const {match} = this.props;
		const {path , url} = match;
		return(
				<div>
					<div>
						{/* TODO : side bar component should be placed here*/}
					</div>
					<div>
						<Link to={`${url}`}>Basic Information</Link>
						<Link to={`${url}/Posts`}>Posts</Link>
						<Link to={`${url}/Career`}>Career</Link>
						<Link to={`${url}/Skills`}>Skills</Link>
						<Link to={`${url}/Certificates`}>Certificates</Link>
						<Switch>
							<Route exact path={`${path}`} component={UserBasicInformation} />
							<Route path={`${path}/Posts`} component={Posts} />
							<Route path={`${path}/Career`} component={Career} />
							<Route path={`${path}/Skills`} component={Skills} />
							<Route path={`${path}/Certificates`} component={Certificates} />
						</Switch>
					</div>
					<div>
						{/* TODO : char bar component should be placed here*/}
					</div>
				</div>
		)
	}
}

export default User;