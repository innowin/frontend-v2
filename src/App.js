import React, { Component } from 'react';
import './fontawesome/css/font-awesome.min.css';
import './styles/global.scss';
import Layout from './views/Layout';
import Login from './views/pages/Login';
import {Route , Redirect} from 'react-router-dom';
import Test from './views/Test';

class App extends Component {
  render() {
    const loggedIn = true;
    return (
      <div className="App">
        <Route exact path="/" render={() => (
						loggedIn ? (
                <Redirect to="/"/>
						) : (
                <Redirect to="/login"/>
						)
				)}/>
        <Route path="/" component={Layout}/>
        <Route path="/login" component={Login}/>
        <Test/>
      </div>
    )
  }
}

export default App;
