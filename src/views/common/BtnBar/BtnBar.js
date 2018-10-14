// @flow
import React from "react"


export type ActType = {
  func: Function,
  title: string,
  className?: string
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
            <div className={`act-btn ${act.className || ''}`} onClick={act.func}>{act.title}</div>
        ))}
      </div>
  )
}