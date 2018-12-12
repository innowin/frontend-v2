import React from 'react'

export default (props) => {
  const {media, title, description} = props
  return (
      <div className='introduce-badges-item-container'>
        <img src={media} className='introduce-badges-media' alt='badge'/>
        <div className='introduce-badges-item-text-container'>
          <div className='introduce-badges-title'>
            {title}
          </div>
          <div className='introduce-badges-description'>
            {description}
          </div>
        </div>
      </div>
  )
}