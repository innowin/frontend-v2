// flow
import * as React from "react"
import {TipsIcon} from '../../../images/icons'

type TipProps = {
  desc: string
}

export default (props: TipProps) => {
  const {desc} = props
  return (
      <div className="tip">
        <div className="icon-wrapper">
          <TipsIcon className="tip-icon"/>
        </div>
        <div className="text">
          <p>{desc}</p>
        </div>
      </div>
  )
}