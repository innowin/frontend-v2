// @flow
import React from 'react'
import uuid from 'uuid'


type VisibleOnLoadImageProps = {
  img: string,
  className?: string
}

const VisibleOnLoadImage = (props: VisibleOnLoadImageProps) => {
  const id = uuid()
  const {img, className = ''} = props
  const image = new Image()
  image.onload = () => {
    const element = document.getElementById(id)
    if (element) element.className += ' visible'
  }
  image.src = img
  return (
      <img id={id} className={`${className} visible-onload-image`} src={image.src} alt="b"/>
  )
}
export default VisibleOnLoadImage