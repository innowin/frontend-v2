import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import {bindActionCreators} from 'redux'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges'
import ExchangeSuggestView from './ExchangeSuggestView'

class SuggestExchanges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followed: [],
    }
  }


  componentWillReceiveProps(nextProps, nextContext) {
    const {clientExchangeMemberships, exchangeMemberships} = nextProps
    if (clientExchangeMemberships.length > 0) {
      const followed = clientExchangeMemberships.reduce((sum, exId) =>
          exchangeMemberships[exId] && {...sum, [exchangeMemberships[exId].exchange_identity_related_exchange.id]: exchangeMemberships[exId].id}, {},
      )
      this.setState({...this.state, followed: {...followed}})
    }
  }

  render() {
    const {exchanges} = this.props
    const {followed} = this.state
    return (
        <div className='bee-panel-cont'>
          <div className='bee-text'>پنجره های پیشنهادی برای شما</div>
          <div>
            {
              Object.values(exchanges).sort((a, b) => a.id - b.id)
                  .filter(ex => !followed[ex.id])
                  .slice(0, 3)
                  .map((exchange, i) =>
                      <ExchangeSuggestView data={exchange} followed={followed} key={i}/>,
                  )
            }
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  exchanges: getExchanges(state),
  clientExchangeMemberships: state.auth.client.exchangeMemberships,
  exchangeMemberships: state.common.exchangeMembership.list,
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestExchanges)