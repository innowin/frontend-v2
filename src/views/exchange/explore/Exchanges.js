// @flow
import * as React from 'react'
import Exchange from './Exchange'
import ExchangeSkeleton from "./Exchange_Skeleton"

type appProps =
    {|
      exchanges: any
    |}

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Exchanges = (props: appProps) => {
  let {exchanges, justFollowing} = props

  exchanges = Object.values(exchanges).filter(exchange =>
      exchange.exchange ?
          exchange.exchange.content.id
          :
          exchange.exchange
  )

  if (justFollowing) {
    exchanges = exchanges.filter(exchange =>
        exchange.exchange ?
            exchange.exchange.content.exchange
            :
            exchange.exchange
    )
  }

  if (exchanges.length > 0) {
    return exchanges.map((exchange, i) =>
        <Exchange key={i} data={exchange.exchange ? exchange.exchange.content : exchange.exchange}/>
    )
  }
  else if (!props.loading) {
    return <div className='exchanges-explore-not-found'>پنجرهی یافت نشد!</div>
  }
  else return loadingArr.map((exchange, i) =>
        <ExchangeSkeleton key={i}/>
    )
}

export default Exchanges