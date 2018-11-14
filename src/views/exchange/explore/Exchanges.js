// @flow
import * as React from 'react'
import Exchange from './Exchange'

type appProps =
    {|
      exchanges: any
    |}

function render(props) {
  let {exchanges, justFollowing} = props

  exchanges = Object.values(exchanges).filter(exchange =>
      exchange.id
  )

  if (justFollowing) {
    exchanges = exchanges.filter(exchange =>
        exchange.exchange
    )
  }

  if (exchanges.length > 0) {
    return exchanges.map((exchange, i) =>
        <Exchange key={i} data={exchange}/>
    )
  }
  else if (!props.loading) return <div className='exchanges-explore-not-found'>بورسی یافت نشد!</div>
  else return null
}

const Exchanges = (props: appProps) => {
  return render(props)
}

export default Exchanges