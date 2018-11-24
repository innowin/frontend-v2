import React from 'react'

export default (props) => {
  return (
      <div className='introduce-badges-item-container'>
        <img src={props.media} className='introduce-badges-media' alt='badge'/>
        <div className='introduce-badges-item-text-container'>
          <div className='introduce-badges-title'>
            {props.title}
          </div>
          <div className='introduce-badges-description'>
            {props.description}
          </div>
        </div>
      </div>
  )
}