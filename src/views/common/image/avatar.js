// @flow
import * as React from 'react'
import helpers from 'src/consts/helperFunctions'
import VisibleOnLoadImage from './visibleOnLoadImage'


type AvatarProps = {
  img?: string,
  name?: string,
  className?: string,
  size?: string,
  raised?: boolean
}

const Avatar = (props: AvatarProps) => {
  const {img, name, className, size, raised} = props
  const nameParts = name ? name.split(' ') : []
  const abbreviation = helpers.abbreviation(nameParts, 2)
  if (img) return (
      <VisibleOnLoadImage img={img} className={
        `avatar ${className || ''} ${size || ''} ${raised? 'raised' : ''}`
      }/>
  )
  return (
      <span>{abbreviation}</span>
  )
}

export default Avatar