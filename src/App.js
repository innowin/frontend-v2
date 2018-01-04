import React, { Component } from 'react';
import './fontawesome/css/font-awesome.min.css';
import './styles/global.scss';
import Test from './views/Test'
import {Route , Switch} from 'react-router-dom';
import Layout from './views/Layout';
import Login from './views/pages/Login';

class App extends Component {
  render() {
    const is_login = true;
    return (
      <div className="App">
        { (is_login) ? <Route exact path="/" component={Layout}/> : <Route exact path="/" component={Login}/>}
        <Test/>
      </div>
    )
  }
}

export default App;
