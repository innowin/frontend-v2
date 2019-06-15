import React, {PureComponent} from 'react'
import ExchangeSuggestView from '../../common/components/ExchangeSuggestView'

class ThirdLevel extends PureComponent {
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
    const {exchanges, hideRegisterModal} = this.props
    const {followed} = this.state
    return (
        <div className='get-data-content'>
          <div className='get-data-third'>
            <div className='get-data-hashtags-cont'>
              {
                Object.values(exchanges)
                    .sort((a, b) => a.id - b.id)
                    .filter(ex => !followed[ex.id])
                    .map((exchange, i) =>
                    <ExchangeSuggestView description={true} data={exchange} followed={followed} key={i}/>,
                )
              }
            </div>
          </div>
          <div className='get-data-third-next'>
            <div className='get-data-content-next-button-on' onClick={() => hideRegisterModal()}>اینوین</div>
          </div>
        </div>
    )
  }
}

export default ThirdLevel