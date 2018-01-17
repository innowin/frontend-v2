import React,{Component} from "react"
import Exchange from "./Exchange"
import Home from "./pages/Home"
import Organization from "./Organization"
import PropsRoute from "../consts/PropsRoute"
import User from "./User"
import { Switch } from "react-router-dom"

class Layout extends Component {
  constructor (props) {
    super (props);
    this.state = {layout: true}
  }

  render(){
  	const {handleSignOut} = this.props;
    return(
				<Switch>
					<PropsRoute exact={true} path="/" component={Home} handleSignOut={handleSignOut}/>
					<PropsRoute  path="/user/:id" component={User} handleSignOut={handleSignOut}/>
					<PropsRoute  path="/organization/:id" component={Organization} handleSignOut={handleSignOut}/>
					<PropsRoute  path="/exchange" component={Exchange} handleSignOut={handleSignOut}/>
				</Switch>
		)
  }
}

export default Layout;