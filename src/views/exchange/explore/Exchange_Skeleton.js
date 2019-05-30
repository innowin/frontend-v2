import React from 'react'

const Exchange_Skeleton = () => {
  return (
      <div className='exchange-model'>

        <div className='exchange-model-avatar'>
          <div id='line'/>
        </div>

        <div className='skeleton-overflow-hidden'>
          <div id='line'/>
          <div className='exchange-model-title-skeleton'><span> </span></div>
          <div className='exchange-model-description-skeleton'><span> </span></div>

          <div className='exchange-model-detail-skeleton-container'>
            <div className='exchange-model-detail-skeleton'>
              <div className='exchange-model-detail-skeleton-cont'>
                <span> </span>
              </div>
            </div>

            <div className='exchange-model-detail-skeleton'>
              <div className='exchange-model-detail-skeleton-cont'>
                <span> </span>
              </div>
            </div>
          </div>

        </div>


        <div className='exchange-follow-green-buttons'>
          <button className='exchange-followed-skeleton'><span> </span>
            <div id='line'/>
          </button>
          <div className='exchange-followed-small'>
            <button className='exchange-followed-skeleton-butt'><span> </span>
              <div id='line'/>
            </button>
          </div>
        </div>

      </div>
  )
}

export default Exchange_Skeleton
