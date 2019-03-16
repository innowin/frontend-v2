import * as React from 'react'

export default ({children}) => {
  return (
      <div className="card-container">
        <div className="card-header"></div>
        <div className="content">
          {children}
        </div>
      </div>
  )
}