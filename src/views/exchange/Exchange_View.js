// @flow
import * as React from "react"
import {Component} from "react"
import TopBar from "../bars/TopBar"
import ChatBar from "../bars/ChatBar"
import PropTypes from "prop-types"
import ExchangeViewBar from "../bars/ExchangeViewBar"
import ExchangePosts from "./ExchangeView/posts/index"
import Exchange_Tabs from "./ExchangeView/Exchange_Tabs"
import {bindActionCreators} from "redux"
import ExchangeMembershipActions from "../../redux/actions/commonActions/exchangeMembershipActions"
import exchangeActions from "../../redux/actions/exchangeActions"
import connect from "react-redux/es/connect/connect"
import postActions from "../../redux/actions/commonActions/postActions"

type PropsExchangeView = {|
  match: { params: Object },
  handleSignOut: Function
|}

class ExchangeView extends Component <PropsExchangeView> {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    let exchangeId = +parseInt(this.props.match.params.id, 10)
    this.props.actions.getExchangeByExId(exchangeId)
    this.props.actions.getPostsByExIdLimitOffset({postParentId: exchangeId, limit: 20, offset: 0})

  }

  render() {
    const {params} = this.props.match
    const exchangeId = +params.id
    const widthOfRightBar = "col-md-2 col-sm-1"
    return (
        <div className='all-exchanges-parent'>
          {/*<TopBar collapseClassName={widthOfRightBar}/>*/}
          <main style={{paddingTop: "65px"}}>
            <div className={`exchange-view-sidebar`}>
              <ExchangeViewBar exchangeId={exchangeId}/>
            </div>
            <Exchange_Tabs exchangeId={exchangeId}/>
          </main>
        </div>
    )
  }
}

const DispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeByExId: exchangeActions.getExchangeByExId,
    getPostsByExIdLimitOffset: postActions.filterPostsByPostParentLimitOffset,

    // editExchange: exchangeActions.editExchange,
    // deleteExchange: exchangeActions.deleteExchange,
    // getAllExchanges: exchangeActions.getAllExchanges,
    // follow: ExchangeMembershipActions.createExchangeMembership,
    // unFollow: ExchangeMembershipActions.deleteExchangeMembership,
    // getExchangeMembershipByExchangeId: ExchangeMembershipActions.getExchangeMembershipByExchangeId,
    // getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
  }, dispatch)
})

export default connect(null, DispatchToProps)(ExchangeView)