import React, {Component} from 'react'
import Exchange from '../../exchange/explore/Exchange'

class ThirdLevel extends Component {
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
          <div>
            {
              Object.values(exchanges).sort((a, b) => a.id - b.id).map((exchange, i) =>
                  <Exchange key={i} data={exchange} followed={followed}/>,
              )
            }
          </div>
          <div>
            <div className='get-data-content-next-button-on' onClick={() => hideRegisterModal()}>اینوین</div>
          </div>
        </div>
    )
  }
}

export default ThirdLevel