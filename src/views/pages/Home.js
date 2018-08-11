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
class Home extends Component<HomeProps, {| activeExchangeId: ?number|}> {

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
    const widthOfRightBar = "col-md-3 col-sm-2"
    return (
      <div className="home-wrapper">
        <TopBar collapseClassName={widthOfRightBar}/>
        <main>
          <HomeSideBar setExchangeId={this._setExchangeId}
                       classNames={`${widthOfRightBar} pr-0 pl-0 -right-sidebar-wrapper`}
                       identityId={identityId}
          />
          <div className="col-md-7 col-sm-9 pr-5-percent -content-wrapper -home-content-wrapper">
            <HomePosts exchangeId={activeExchangeId}/>
          </div>
          <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
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