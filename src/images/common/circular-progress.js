import React from 'react'

export default ({className='svg-progress' ,r=90,cx=100, cy=100}) => (
  <svg className={className} viewPort="0 0 100 100">
    <circle r={r} cx={cx} cy={cy} fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"/>
    <circle id="bar" r={r} cx={cx} cy={cy} fill="transparent" strokeLinecap="butt" strokeDasharray="565.48" strokeDashoffset="0"/>
  </svg>
)
