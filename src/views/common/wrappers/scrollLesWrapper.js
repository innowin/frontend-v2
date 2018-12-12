// @flow
import * as React from "react"


type ScrollLessWrapperProps = {
  className?: string,
  points: string,
  children: React.Node
}

const ScrollLessWrapper = (props: ScrollLessWrapperProps) => {
  const {children, className, points = 'right'} = props
  return (
      <div className={`scroll-less-wrapper ${points} ${className || ''}`}>
          {children}
      </div>
  )
}
export default ScrollLessWrapper