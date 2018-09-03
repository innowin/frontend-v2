// @flow
import * as React from "react"
import type {SuccessMessageActionType} from "./types"


type ActBarProps = {
  acts: Array<SuccessMessageActionType>
}

const ActBar = (props: ActBarProps) => {
  const {acts} = props
  return (
      <div className="act-bar">
        {acts.map(act => (
            <div key={act.title} className="act-btn" onClick={act.handler}>
              {act.image}
              {act.title}
            </div>
        ))}
      </div>
  )
}
export default ActBar