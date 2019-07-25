import React, {PureComponent} from 'react'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import {bindActionCreators} from 'redux'
import {getAllOfExchanges, getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges'
import ExchangeSuggestView from './ExchangeSuggestView'
import {clientMemberships} from 'src/redux/selectors/common/exchanges/ClientMemberships'
import {exchangeMemberships} from 'src/redux/selectors/common/exchanges/ExchangeMemberships'
import {getClientObject} from '../../../redux/selectors/common/client/getClient'

class SuggestExchanges extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      followed: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const {clientIdentity, actions} = this.props
      // added hamtimi
      actions.getExchangeByExId(33026, true)

      if (clientIdentity && clientIdentity.identity_hashtag)
        actions.getAllExchanges(24, 1, null, [...clientIdentity.identity_hashtag], true)
    }, 500)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {clientExchangeMemberships, exchangeMemberships} = nextProps
    if (clientExchangeMemberships.length > 0) {
      const followed = clientExchangeMemberships.reduce((sum, exId) =>
          exchangeMemberships[exId] && {...sum, [exchangeMemberships[exId].exchange_identity_related_exchange]: exchangeMemberships[exId].id}, {},
      )
      this.setState({...this.state, followed: {...followed}})
    }
    else this.setState({...this.state, followed: []})
  }

  render() {
    const {followed} = this.state
    const {hamTimi} = this.props
    const exchanges = Object.values(this.props.exchanges).filter(ex => ex.id && !followed[ex.id])
    if (exchanges.length > 0)
      return (
          <div className='bee-panel-cont'>
            <div className='bee-text'>پنجره های پیشنهادی برای شما</div>
            <div>
              {/*added hamtimi*/}
              {hamTimi && !followed[hamTimi.id] && <ExchangeSuggestView data={hamTimi} followed={followed}/>}
              {
                exchanges.slice(0, 3).map((exchange, i) => <ExchangeSuggestView data={exchange} noBorder={i === 2} followed={followed} key={i}/>)
              }
            </div>
          </div>
      )
    else return null
  }
}

// added hamtimi
const mapStateToProps = (state) => ({
  exchanges: getExchanges(state),
  hamTimi: getAllOfExchanges(state)[33026],
  clientExchangeMemberships: clientMemberships(state),
  exchangeMemberships: exchangeMemberships(state),
  clientIdentity: getClientObject(state),
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeByExId: exchangeActions.getExchangeByExId,
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestExchanges)
