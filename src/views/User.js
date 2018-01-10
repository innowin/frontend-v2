import  React,{Component} from "react"
import  Career from "./user/Career"
import  Certificates from "./user/Certificates"
import  Posts from "./user/Posts"
import  PropsRoute from "../consts/PropsRoute"
import  Skills from "./user/Skills"
import  UserBasicInformation from "./user/basicInformation/index"
import  {Link , Switch} from "react-router-dom"
import {ID} from "../consts/data"
import TopBar from "./bars/TopBar"

class User extends Component {
	constructor (props) {
		super (props);
		this.state = {
		}
	}
	
	render(){
		const {match , socket , handleSignOut} = this.props;
		const {path , url} = match;
		return(
				<div>
					<TopBar handleSignOut={handleSignOut}/>
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
							<PropsRoute exact={true} path={`${path}`} component={UserBasicInformation} socket={socket} userId={ID}/>
							<PropsRoute path={`${path}/Posts`} component={Posts} socket={socket} userId={ID}/>
							<PropsRoute path={`${path}/Career`} component={Career} socket={socket} userId={ID}/>
							<PropsRoute path={`${path}/Skills`} component={Skills} socket={socket} userId={ID}/>
							<PropsRoute path={`${path}/Certificates`} component={Certificates} socket={socket} userId={ID}/>
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