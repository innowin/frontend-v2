// @flow
import * as React from 'react'
import Exchange from './Exchange'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'

type appProps =
    {|
      exchanges: any
    |}

function render(exchanges, props) {
  if (Object.values(exchanges).length > 0) {
    return Object.values(exchanges).map((exchange, i) =>
        <Exchange key={i} data={exchange}/>
    )
  }
  else if (props.searchingByWord.length !== 0 || props.searchingByHashTags.length !== 0) {
    return (<div>بورسی یافت نشد!</div>)
  }
  else return <ClipLoader/>
}

const Exchanges = (props: appProps) => {
  const {exchanges} = props
  return (
      <div className="exchanges-explore">
        {
          render(exchanges, props)
        }
      </div>
  )
}
const mapStateToProps = (state) => ({
  searchingByWord: state.exchanges.searchByWord,
  searchingByHashTags: state.exchanges.searchByHashTag,
})

export default connect(mapStateToProps, null)(Exchanges)