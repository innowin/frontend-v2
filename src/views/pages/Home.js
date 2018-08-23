// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import TopBar from "../bars/TopBar"
import ChatBar from "../bars/ChatBar"
import HomeSideBar from "./home/HomeSideBar"
import HomePosts from "./home/HomePosts"
import {connect} from "react-redux"

type HomeProps = {|
  identityId: number
|}

class Home extends Component<HomeProps, {| activeExchangeId: ?number |}> {

  static propTypes = {
    identityId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {activeExchangeId: null}
  }

  _setExchangeId = (exchangeId: number) => {
    const {activeExchangeId} = this.state
    if (exchangeId !== activeExchangeId) {
      this.setState({...this.state, activeExchangeId: exchangeId})
    }
  }

  render() {
    const {identityId} = this.props
    const {activeExchangeId} = this.state
    return (
      <div className="home-wrapper">
        <TopBar collapseClassName="col-2"/>
        <main className="-main">
          <div className="row content">
            <HomeSideBar setExchangeId={this._setExchangeId}
                         classNames="col-3 pr-0 pl-0 -right-sidebar-wrapper"
                         identityId={identityId}
            />
            <HomePosts exchangeId={activeExchangeId} className="col-6"/>
            <div className="col-3"/>
          </div>
          <ChatBar className="pr-0 pl-0 -left-sidebar-wrapper"/>
        </main>

      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    identityId: state.auth.client.identity.id
  }
)
export default connect(mapStateToProps)(Home)