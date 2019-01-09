import React from 'react'
import DefaultImage from '../../../images/defaults/defaultImage'

export default () => {
  return (
      <div className='introduce-badges-item-container'>
        <div>
          <DefaultImage className='introduce-badges-media-skeleton'/>
          <div className='introduce-badges-item-text-container'>
            <div className='introduce-badges-title-skeleton'>
              <span> </span>
            </div>
            <div className='introduce-badges-description-skeleton'>
              <span> </span>
            </div>
          </div>
        </div>
        <div className='bright-line-badge'/>
      </div>
  )
}