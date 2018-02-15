import React, {Component} from 'react';
import TopBar from "../bars/TopBar";
import ChatBar from '../bars/ChatBar';
import HomeSideBar from './home/HomeSideBar';
import HomePosts from './home/HomePosts';
import {IDENTITY_ID as identity} from "src/consts/data";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {activeExchangeId: null}
  }

  _get_exchangeId = (exchangeId) => {
    const {activeExchangeId} = this.state;
    if (exchangeId !== activeExchangeId) {
      this.setState({...this.state, activeExchangeId: exchangeId})
    }
  };

  render() {
    const {handleSignOut} = this.props;
    const {activeExchangeId} = this.state;
    return (
      <div className="home-wrapper">
        <TopBar handleSignOut={handleSignOut}/>
        <main>
          <div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
            <HomeSideBar identity={identity} get_exchangeId={this._get_exchangeId} />
          </div>
          <div className="col-md-8 col-sm-10 -content-wrapper -home-content-wrapper">
            <HomePosts identity={identity} exchangeId={activeExchangeId}/>
          </div>
          <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
        </main>
      </div>
    )
  }
}

export default Home;