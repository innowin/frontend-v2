import React from 'react'
import Exchange from './Exchange'
import ExchangeSkeleton from './Exchange_Skeleton'
import {DesertIcon} from 'src/images/icons'

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Exchanges = (props) => {
  let {exchanges, followed, justFollowing} = props

  exchanges = Object.values(exchanges).filter(exchange => exchange.id).sort((a, b) => a.id - b.id)

  if (justFollowing) {
    exchanges = exchanges.filter((exchange) =>
        followed[exchange.id],
    )
  }

  if (exchanges.length > 0) {
    return exchanges.map((exchange, i) =>
        <Exchange key={i} data={exchange} followed={followed}/>,
    )
  }
  else if (!props.loading) {
    return <div className="empty-posts">
      <DesertIcon width="100%" text="پنجره ای بارگذاری نشده"/>
    </div>
  }
  else return loadingArr.map((exchange) =>
        <ExchangeSkeleton key={exchange}/>,
    )
}

export default Exchanges