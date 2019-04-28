// @flow
import * as React from 'react'
import Exchange from './Exchange'
import ExchangeSkeleton from './Exchange_Skeleton'
import {DesertIcon} from 'src/images/icons'

type appProps =
    {|
      exchanges: { exchange: {} },
      justFollowing: boolean,
      loading: boolean
    |}

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Exchanges = (props: appProps) => {
  let {exchanges, followed /*justFollowing*/} = props

  exchanges = Object.values(exchanges).sort((a, b) => a.id - b.id)

  // if (justFollowing) {
  //   exchanges = exchanges.filter((exchange: Object) =>
  //       exchange.exchange ?
  //           exchange.exchange.content.exchange
  //           :
  //           exchange.exchange
  //   )
  // }

  if (exchanges.length > 0) {
    return <React.Fragment>
      {
        exchanges.map((exchange: Object, i: number): any =>
            <Exchange key={i} data={exchange} followed={followed}/>,
        )
      }
    </React.Fragment>
  }
  else if (!props.loading) {
    return <div className="empty-posts">
      <DesertIcon width="100%" text="پنجره ای بارگذاری نشده"/>
    </div>
  }
  else return <React.Fragment>
      {
        loadingArr.map((exchange: Object): any =>
            <ExchangeSkeleton key={exchange}/>,
        )
      }
    </React.Fragment>
}

export default Exchanges