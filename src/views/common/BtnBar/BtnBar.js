// @flow
import * as React from "react"
import FontAwesome from "react-fontawesome"


export type ActType = {
  func: Function,
  title: string,
  className?: string,
  icon?: React.Node
}
type Props = {
  className?: string,
  acts: Array<ActType>,
  processing?: boolean,
  processingFunc?: Function
}

export default (props: Props) => {
  const {acts, className, processing, processingFunc=() => console.log('processing now!')} = props
  return (
      <div style={{display:"flex", justifyContent:"space-between", margin:"0 20px"}} className={`act-bar ${className || ''} ${processing ? 'processing': ''}`}>
        {acts.map(act => (
            <div
                key={`act-btn-${act.title}`}
                className={`act-btn ${act.className || ''}`}
                onClick={processing ? processingFunc : act.func}
            >
              {processing ? (<FontAwesome name="spinner"/>) : act.title}
              {act.icon}
            </div>
        ))}
      </div>
  )
}