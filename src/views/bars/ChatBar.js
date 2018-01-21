import React, {Component} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {userInfoIcon, workExperienceIcon, postIcon} from "src/images/icons"

class MainChatBar extends Component {

  static propTypes = {
    tab: PropTypes.string.isRequired,
  };

  render() {
    const {tab} = this.props;
    let content = (
      <div>
        <h2> i am chat</h2>
      </div>
    );
    if (tab === "map") {
      content = (
        <div>
          <h2> i am map</h2>
        </div>
      )
    }
    if (tab === "dashboard") {
      content = (
        <div>
          <h2> i am dashboard</h2>
        </div>
      )
    }
    return content;
  }
}


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {tab: "chat"}
  }

  _handleChat = () => {
    const newState = {...this.state, tab: "chat"};
    this.setState(newState)
  };

  _handleMap = () => {
    const newState = {...this.state, tab: "map"};
    this.setState(newState)
  };

  _handleDashboard = () => {
    const newState = {...this.state, tab: "dashboard"};
    this.setState(newState)
  };

  render() {
    return (
      <div className="row">
        <div className="col-11">
          <MainChatBar tab={this.state.tab}/>
        </div>
        <div className="col-1 d-flex flex-column align-items-end -my-icons1">
          <Link onClick={this._handleChat} to="#">{userInfoIcon}</Link>
          <Link onClick={this._handleMap} to="#">{postIcon}</Link>
          <Link onClick={this._handleDashboard} to="#">{workExperienceIcon}</Link>
        </div>
      </div>
    )
  }
}

export default ChatBar;
