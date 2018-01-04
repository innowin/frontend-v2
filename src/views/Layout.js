import React,{Component} from 'react';
import Exchanges from './pages/Exchanges';
import Home from './pages/Home';
import Profile from './pages/Profile';
import TopBar from './TopBar';
import {Switch , Route} from 'react-router-dom';

class Layout extends Component {
  constructor (props) {
    super (props);
    this.state = {
      is_exchanges : true,
    }
  }

  render(){
    return(
      <div>
        <TopBar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/exchanges/:id" component={Exchanges}/>
          <Route path="/profile/:id" component={Profile}/>
        </Switch>
        <pre>{JSON.stringify(this.props, null , 2)}</pre>
      </div>
    )
  }
}

export default Layout;