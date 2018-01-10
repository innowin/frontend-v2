import React,{Component} from 'react';
import Home from './pages/Home';
import TopBar from './TopBar';
import PropsRoute from '../consts/PropsRoute'
import User from './User';
import Exchange from './Exchange';
import Organization from './Organization';
import { Switch } from 'react-router-dom';

class Layout extends Component {
  constructor (props) {
    super (props);
    this.state = {
    	layout: true,
    }
  }

  render(){
  	const {socket , handleSignOut } = this.props;
    return(
			<div>
				<Switch>
					<PropsRoute exact={true} path="/" component={Home} socket={socket} handleSignOut={handleSignOut} />
					<PropsRoute  path="/user" component={User} socket={socket}  handleSignOut={handleSignOut}/>
					<PropsRoute  path="/organization" component={Organization} socket={socket}  handleSignOut={handleSignOut}/>
					<PropsRoute  path="/exchange" component={Exchange} socket={socket}  handleSignOut={handleSignOut}/>
				</Switch>
			</div>
		)
  }
}

export default Layout;