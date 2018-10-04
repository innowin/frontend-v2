// @flow
import * as React from 'react'

export type TagType = {
  title: string
}

export const Tag = (props: TagType) => {
  const {title} = props
  return (
      <div className="tag">{title}</div>
  )
}