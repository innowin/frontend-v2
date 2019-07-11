import React from 'react'
import InfoView from './InfoView'
import StatisticView from './StatisticView'
import ExchangeManager from './ExchangeManager'
import MembersView from './MembersView'
import HomePosts from '../../pages/home/HomePosts'
import {PureComponent} from 'react'

class Exchange_Info extends PureComponent {

  backButton = () => {
    window.history.back()
  }

  render() {
    const {activeTab, exchangeId} = this.props
    switch (activeTab) {
      case 'Stream':
        return (
            <HomePosts unSetExchangeId={this.backButton} exchangeId={exchangeId} className="post-wrapper active-exchange" exchangePage={true}/>
        )
      case 'Info':
        return (
            <div className='exchange-content-view-frame'>
              <InfoView exchangeId={exchangeId}/>
            </div>
        )
      case 'Members':
        return (
            <div className='exchange-content-view-frame'>
              <MembersView exchangeId={exchangeId}/>
            </div>
        )
      case 'Statistic':
        return (
            <div className='exchange-content-view-frame'>
              <StatisticView exchangeId={exchangeId}/>
            </div>
        )
      case 'Exchange Manager':
        return (
            <div className='exchange-content-view-frame'>
              <ExchangeManager exchangeId={exchangeId}/>
            </div>
        )
      default:
        return null
    }
  }
}

export default Exchange_Info