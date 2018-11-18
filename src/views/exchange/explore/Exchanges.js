// @flow
import * as React from 'react'
import Exchange from './Exchange'
import ExchangeSkeleton from "./Exchange_Skeleton"

type appProps =
    {|
      exchanges: any
    |}


const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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
  else if (!props.loading) {
    return <div className='exchanges-explore-not-found'>بورسی یافت نشد!</div>
  }
  else return loadingArr.map((exchange, i) =>
        <ExchangeSkeleton key={i}/>
    )
}

const Exchanges = (props: appProps) => {
  return render(props)
}

export default Exchanges