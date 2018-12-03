// @flow
import * as React from "react"
import {Component} from "react"
import TopBar from "../bars/TopBar"
import ChatBar from "../bars/ChatBar"
import PropTypes from "prop-types"
import ExchangeViewBar from "../bars/ExchangeViewBar"
import ExchangePosts from "./ExchangeView/posts/index"
import Exchange_Tabs from "./ExchangeView/Exchange_Tabs"

type PropsExchangeView = {|
  match: { params: Object },
  handleSignOut: Function
|}

class ExchangeView extends Component <PropsExchangeView> {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render() {
    const {params} = this.props.match
    const exchangeId = +params.id
    const widthOfRightBar = "col-md-2 col-sm-1"
    return (
        <div className='all-exchanges-parent'>
          {/*<TopBar collapseClassName={widthOfRightBar}/>*/}
          <main style={{paddingTop: '65px'}}>
            <div className={`exchange-view-sidebar`}>
              <ExchangeViewBar exchangeId={exchangeId}/>
            </div>
            <Exchange_Tabs exchangeId={exchangeId}/>
          </main>
        </div>
    )
  }
}

export default ExchangeView