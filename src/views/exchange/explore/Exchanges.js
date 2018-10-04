// @flow
import * as React from 'react'
import Exchange from './Exchange'
import {ClipLoader} from 'react-spinners'

const Exchanges = (props) => {
  const {exchanges} = props
  return (
      <div className="exchanges-explore">
        {
          exchanges ?
              Object.values(exchanges).length > 0 ?
                  Object.values(exchanges).map((exchange, i) =>
                      <Exchange key={i} data={exchange}/>
                  )
                  :
                  <div>بورسی یافت نشد!</div>
              :
              <ClipLoader/>
        }
      </div>
  )
}
export default Exchanges