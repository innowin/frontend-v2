// @flow
import * as React from 'react'
import Exchange from './Exchange'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'

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
  else if (props.searchingByWord.length !== 0 || props.searchingByHashTags.length !== 0) {
    return (<div style={{textAlign: 'center'}}>بورسی یافت نشد!</div>)
  }
  else return <div style={{textAlign: 'center'}}><ClipLoader/></div>
}

const Exchanges = (props: appProps) => {
  return render(props)
}
const mapStateToProps = (state) => ({
  searchingByWord: state.exchanges.searchByWord,
  searchingByHashTags: state.exchanges.searchByHashTag,
})

export default connect(mapStateToProps, null)(Exchanges)