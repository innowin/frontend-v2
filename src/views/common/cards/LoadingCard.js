// @flow
import * as React from "react"
import {ClipLoader} from "react-spinners"

type div = React.Element<'div'>
export const loadingCard = (): div => {
  return (
    <div className="-loading">
      <div className="loading-box">
        <ClipLoader color="#999" size={40} margin="4px" loading={true}/>
      </div>
    </div>
  )
}


