// @flow
import React from 'react'
import uuid from 'uuid'


type VisibleOnLoadImageProps = {
  img: string,
  className?: string
}

export default (props: VisibleOnLoadImageProps) => {
  const id = uuid()
  const {img, className = ''} = props
  const image = new Image()
  image.onload = () => {
    const element = document.getElementById(id)
    if (element && !element.className.includes('is-visible')) {
        element.className += ' is-visible'
    }
  }
  image.src = img
  return (
      <img id={id} className={`${className} visible-onload-image`} src={img} alt="b"/>
  )
}