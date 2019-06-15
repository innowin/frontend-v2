import React, {PureComponent} from 'react'
import PropTypes from "prop-types"
import ExchangeViewBar from "../bars/ExchangeViewBar"
import ExchangeTabs from "./ExchangeView/Exchange_Tabs"
import {bindActionCreators} from "redux"
import exchangeActions from "src/redux/actions/exchangeActions"
import connect from "react-redux/es/connect/connect"
import postActions from "src/redux/actions/commonActions/postActions"


class ExchangeView extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    let exchangeId = +parseInt(this.props.match.params.id, 10)
    const {actions} = this.props
    actions.getExchangeByExId(exchangeId)
    actions.getPostsByExIdLimitOffset({postParentId: exchangeId, limit: 30, offset: 0})
  }

  render() {
    const {params} = this.props.match
    const exchangeId = +params.id
    return (
        <div className="all-exchanges-parent">
          <main className="exchange-page">
            <div className="exchange-view-sidebar">
              <ExchangeViewBar exchangeId={exchangeId}/>
            </div>
            <ExchangeTabs exchangeId={exchangeId}/>
          </main>
        </div>
    )
  }
}

const DispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeByExId: exchangeActions.getExchangeByExId,
    getPostsByExIdLimitOffset: postActions.filterPostsByPostParentLimitOffset,
  }, dispatch),
})

export default connect(null, DispatchToProps)(ExchangeView)