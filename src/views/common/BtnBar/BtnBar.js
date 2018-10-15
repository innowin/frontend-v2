// @flow
import * as React from "react"


export type ActType = {
  func: Function,
  title: string,
  className?: string,
  icon?: React.Node
}
type Props = {
  className?: string,
  acts: Array<ActType>
}

export default (props: Props) => {
  const {acts, className} = props
  return (
      <div className={`act-bar ${className || ''}`}>
        {acts.map(act => (
            <div
                key={`act-btn-${act.title}`}
                className={`act-btn ${act.className || ''}`}
                onClick={act.func}
            >
              {act.title}
              {act.icon}
            </div>
        ))}
      </div>
  )
}