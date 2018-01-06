import React,{Component} from 'react';
import Home from './pages/Home';
import TopBar from './TopBar';
import User from './User';
import Exchange from './Exchange';
import Organization from './Organization';
import {Switch , Route} from 'react-router-dom';

class Layout extends Component {
  constructor (props) {
    super (props);
    this.state = {
    }
  }

  render(){
    return(
      <div>
        <TopBar/>
				<div>
					<Switch>
						<Route exact={true} path="/" component={Home}/>
						<Route  path="/user" component={User}/>
						<Route  path="/organization" component={Organization}/>
						<Route  path="/exchange" component={Exchange}/>
					</Switch>
				</div>
        {/*<pre>{JSON.stringify(this.props, null , 2)}</pre>*/}
      </div>
    )
  }
}

export default Layout;