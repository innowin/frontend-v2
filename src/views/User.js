import  React,{Component} from "react"
import  Career from "./user/career/index"
import  Certificates from "./user/Certificates"
import  Posts from "./user/Posts"
import  PropsRoute from "../consts/PropsRoute"
import  Skills from "./user/skills/index"
import  UserBasicInformation from "./user/basicInformation/index"
import  {Link , Switch} from "react-router-dom"
import {ID} from "../consts/data"
import TopBar from "src/views/bars/TopBar"
import ChatBar from "src/views/bars/ChatBar"

class User extends Component {
	constructor (props) {
		super (props);
		this.state = {}
	}

	render(){
		const {match , socket , handleSignOut} = this.props;
		const {path , url} = match;
		return(
				<div className="-tabbed-pages">
					<TopBar handleSignOut={handleSignOut}/>
          <main className="row">
            <div className="col-3">
              {/* TODO : side bar component should be placed here*/}
            </div>
            <div className="col-6">
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
            <div className="col-3 chatBar">
              <ChatBar/>
            </div>
          </main>
				</div>
		)
	}
}

export default User;